<script lang="ts">
	import type { Textbox } from '$lib/types';
	import { getContext } from 'svelte';
	import { activeResponses } from '$lib/store';

	export let component: Textbox;
	export let content: string = '';
	const id: number = getContext('id');

	export let error: String | undefined = undefined;

	$: content = String($activeResponses[id].data[component.id] || '');

	let wordLength = 0;

	const validateLength = () => {
		wordLength = content.length;

		error =
			component.maxLength != null && wordLength > component.maxLength
				? 'Too long'
				: wordLength == 0
					? "Field can't be empty"
					: undefined;
	};

	$: {
		// Do nothing with content, just keep it
		// in this block so we run it every time it changes
		content;
		validateLength();
	}
</script>

<div>
	<div class="flex relative">
		<!-- The following component is the original component -->
		<!-- 
        <textarea bind:value={$activeResponses[id].data[component.id]} class="flex-auto h-[20vh] my-2 min-h-16 max-h-[60vh] bg-primary w-64 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9 scroll scrollbar-thin scrollbar-thumb-enabled scrollbar-track-background" ></textarea>
        -->

		<!-- This component disables the opportuinty to add newlines. If this is undesirable, comment this out and use the component commented out above. -->
		<textarea
			rows="1"
			bind:value={$activeResponses[id].data[component.id]}
			class="flex-auto my-2 h-32 max-h-64 min-h-12 bg-primary w-64 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9 resize-none"
			on:keydown={(e) => {
				if (e.key === 'Enter') e.preventDefault();
			}}
			on:input={(e) => {
				const el = e.currentTarget;
				el.value = el.value.replace(/[\r\n]+/g, ' ');
				$activeResponses[id].data[component.id] = el.value;
			}}
		></textarea>

		{#if component.maxLength != null}
			<span
				class="absolute right-3 bottom-2 text-gray-400 text-sm"
				class:!text-red-500={error}
				class:font-bold={error}
				class:text-lg={error}
				>{wordLength} / {component.maxLength}
			</span>
		{/if}
	</div>
</div>
