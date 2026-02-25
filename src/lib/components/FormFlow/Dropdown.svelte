<script lang="ts">
	import { activeResponses } from '$lib/store';
	import type { Dropdown } from '$lib/types';
	import { getContext } from 'svelte';

	export let component: Dropdown;

	const id: number = getContext('id');

	const PLACEHOLDER = '[select something]';
	const OTHER = 'Other';

	const hasPlaceholder = component.options.includes(PLACEHOLDER);
	const hasOther = component.options.includes(OTHER);

	// Local state for the <select> element — decoupled from the store so we can
	// write a *resolved* value (e.g. the typed "Other" text) to the store instead.
	let selectedOption: string = component.options[0];
	let otherText: string = '';

	export let error: string | undefined = undefined;

	// Initialize store on first render if not already set
	$: if ($activeResponses[id].data[component.id] === undefined) {
		$activeResponses[id].data[component.id] = component.options[0];
		selectedOption = component.options[0];
	}

	$: showOtherBox = hasOther && selectedOption === OTHER;

	/**
	 * Writes the resolved value to the store and updates the error state.
	 * Mirrors the syncToStore() pattern used by MultiSelect.
	 */
	function syncToStore() {
		// Block submission when placeholder is active
		if (hasPlaceholder && selectedOption === PLACEHOLDER) {
			$activeResponses[id].data[component.id] = PLACEHOLDER;
			error = 'Please select a value';
			return;
		}

		// When "Other" is chosen, write the typed text (not the word "Other")
		if (hasOther && selectedOption === OTHER) {
			if (otherText.trim().length === 0) {
				$activeResponses[id].data[component.id] = OTHER;
				error = 'Please describe "Other"';
				return;
			}
			$activeResponses[id].data[component.id] = otherText.trim();
			error = undefined;
			return;
		}

		// Normal selection — run custom validator if provided
		$activeResponses[id].data[component.id] = selectedOption;
		error = component.validator ? (component.validator(selectedOption) ?? undefined) : undefined;
	}

	// Re-sync whenever selectedOption or otherText changes
	$: {
		selectedOption;
		otherText;
		syncToStore();
	}
</script>

<div class="my-2">
	<div class="sm:flex justify-between items-center gap-2">
		<span class="flex sm:inline mt-1 sm:mt-0">
			{#if !component.manual}
				<select
					bind:value={selectedOption}
					class="flex-auto sm:inline bg-primary w-80 md:w-96 min-w-max rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
				>
					{#each component.options as option}
						<option class="cursor-pointer" value={option}>{option}</option>
					{/each}
				</select>
			{:else}
				<!-- Display a text input field if manual is true -->
				<input
					type="text"
					bind:value={$activeResponses[id].data[component.id]}
					class="flex-auto sm:inline bg-primary w-80 md:w-96 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
				/>
			{/if}
		</span>
	</div>

	<!-- "Other" text box — only shown when "Other" is selected, matching MultiSelect's architecture -->
	{#if showOtherBox}
		<div class="mt-2">
			<span class="text-sm text-gray-400 mb-1 block">Describe "Other":</span>
			<textarea
				bind:value={otherText}
				placeholder="Specify a custom value…"
				on:keydown={(e) => {
					if (e.key === 'Enter') e.preventDefault();
				}}
				on:input={(e) => {
					const el = e.currentTarget;
					el.value = el.value.replace(/[\r\n]+/g, ' ');
					otherText = el.value;
				}}
				class="flex-auto h-[12vh] min-h-12 max-h-[40vh] bg-primary w-full rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover scroll scrollbar-thin scrollbar-thumb-enabled scrollbar-track-background resize-none"
			></textarea>
		</div>
	{/if}

	{#if error != undefined}
		<div class="text-red-700 text-md font-bold w-max ml-[auto]">{error}</div>
	{/if}
</div>
