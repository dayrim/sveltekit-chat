<script lang="ts">
	import { PapperPlaneSolid } from 'flowbite-svelte-icons';
	import { currentMessage } from '../store/messageStore';

	export let sendMessage: () => void;

	function autoResize(node: HTMLTextAreaElement) {
		function resize() {
			node.style.height = 'auto';
			node.style.height = node.scrollHeight + 'px';
		}

		node.addEventListener('input', resize);
		resize();
		return {
			destroy() {
				node.removeEventListener('input', resize);
			}
		};
	}
	function handleKeypress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			sendMessage();
			event.preventDefault();
		}
	}
</script>

<div class="max-w-md md:max-w-lg lg:max-w-xl mx-auto py-6 px-3">
	<form class="w-full" on:submit|preventDefault={sendMessage}>
		<div class="flex gap-5 items-center justify-center">
			<textarea
				use:autoResize
				class="py-1 px-2 w-full border border-gray-400 rounded resize-none overflow-hidden
                focus:outline-none hover:border-gray-700 focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
				rows="1"
				bind:value={$currentMessage}
				on:keydown={handleKeypress}
				placeholder="Type your message..."
			></textarea>

			<button
				type="submit"
				class="flex-shrink-0 flex justify-center items-center
                bg-gray-800 w-8 h-8 text-white rounded-full hover:bg-gray-600"
				><PapperPlaneSolid tabindex="-1" class="focus:outline-none" />
			</button>
		</div>
	</form>
</div>
