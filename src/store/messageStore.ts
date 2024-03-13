import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { MessageType } from '../types/chatTypes';

function getInitialMessages(): MessageType[] {
	if (browser) {
		const messages = localStorage.getItem('messages');
		if (messages) {
			try {
				return JSON.parse(messages);
			} catch (e) {
				console.error('Failed to parse messages from localStorage', e);
			}
		}
	}
	return [];
}

function createMessagesStore() {
	const initialMessages = getInitialMessages();
	const { subscribe, set, update } = writable<MessageType[]>(initialMessages);

	return {
		subscribe,
		addMessage: (newMessage: MessageType) => {
			update((messages) => {
				const updatedMessages = [...messages, newMessage];
				if (browser) {
					localStorage.setItem('messages', JSON.stringify(updatedMessages));
				}
				return updatedMessages;
			});
		},
		reset: () => {
			if (browser) {
				localStorage.removeItem('messages');
			}
			set([]);
		}
	};
}

export const messages = createMessagesStore();
export const currentMessage = writable('');
