<script>
	import '../app.css';
</script>

<div
	class="sticky h-10 top-0 z-10 bg-gray-800 flex items-center text-gray-200 justify-center align-items py-3"
>
	<h1 class="text-center text-base font-normal">New chat</h1>
</div>
<slot />

<svelte:head>
	<title>Simple Chat</title>
</svelte:head>
