<script lang="ts">
	import type { MessageType } from '../types/chatTypes';

	export let message: MessageType;
	export let avatarUrl: string; // Accepting avatar URL as a prop
	export let isUserMessage: boolean;
</script>

<div class={`w-full `}>
	<div
		class={`flex items-center gap-3 min-h-24 py-6 px-3 ${isUserMessage ? 'flex-row-reverse' : ''} max-w-md md:max-w-lg lg:max-w-xl mx-auto`}
	>
		<div class="flex-shrink-0 w-10 h-10">
			<img src={avatarUrl} alt="User Avatar" class="h-10 w-10 rounded-full object-cover" />
		</div>
		<div
			class={`p-4  ${isUserMessage ? 'bg-gray-200 rounded-b-xl rounded-tl-xl ' : 'bg-white rounded-e-xl rounded-es-xl '}`}
		>
			<p>{message.text}</p>
		</div>
	</div>
</div>
