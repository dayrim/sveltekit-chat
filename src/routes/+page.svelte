<script lang="ts">
	import Message from '$lib/Message.svelte';
	import MessageInput from '$lib/MessageInput.svelte';
	import { messages, currentMessage } from '../store/messageStore';
	import type { MessageType, CommentType } from '../types/chatTypes';
	import { tick } from 'svelte';

	let bottomOfChat: HTMLElement;

	$: ($messages, bottomOfChat), scrollToBottom();

	function scrollToBottom() {
		if ($messages.length > 0 && bottomOfChat) bottomOfChat.scrollIntoView({ behavior: 'smooth' });
	}

	async function sendMessage() {
		const currentMessageText = $currentMessage.trim();
		if (!currentMessageText) return;

		const newMessage: MessageType = {
			id: Date.now().toString(),
			text: currentMessageText,
			user: {
				id: 999999,
				username: 'Me',
				avatarUrl: 'https://i.pravatar.cc/300?img=3'
			}
		};

		messages.addMessage(newMessage);
		currentMessage.set('');

		await tick();
		scrollToBottom();

		setTimeout(async () => {
			await fetchRandomComment();

			await tick();
			scrollToBottom();
		}, 2000);
	}

	async function fetchRandomComment() {
		try {
			const response = await fetch('https://dummyjson.com/comments');
			const data = await response.json();
			if (!data || !data.comments || data.comments.length === 0) {
				throw new Error('No comments found');
			}

			let randomComment: CommentType | undefined;
			const existingIds = $messages.map((msg) => msg.id);

			// Attempt to select a comment that doesn't already exist in the messages
			for (let attempts = 0; attempts < data.comments.length; attempts++) {
				const index = Math.floor(Math.random() * data.comments.length);
				const candidate = data.comments[index];
				if (!existingIds.includes(candidate.id.toString())) {
					randomComment = candidate;
					break;
				}
			}

			if (!randomComment) {
				console.warn('Failed to find a new random comment.');
				return;
			}

			const replyMessage: MessageType = {
				id: randomComment.id.toString(),
				text: randomComment.body,
				user: {
					id: randomComment.user.id,
					username: randomComment.user.username,
					avatarUrl: `https://i.pravatar.cc/300?u=14`
				}
			};

			messages.addMessage(replyMessage);
		} catch (error) {
			console.error('Failed to fetch random comment:', error);
		}
	}
</script>

<div class="flex flex-col h-[calc(100vh-2.5rem)]">
	<div class="overflow-y-auto flex-1 w-full bg-gray-100">
		{#each $messages as message, index (message.id)}
			<Message
				{message}
				avatarUrl={message.user.avatarUrl}
				isUserMessage={message.user.id === 999999}
			/>
		{/each}
		<div bind:this={bottomOfChat}></div>
	</div>

	<div class={`w-[calc(100vw-15px)] text-gray-800 `}>
		<MessageInput {sendMessage} />
	</div>
</div>
