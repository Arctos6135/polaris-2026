<script lang="ts">
    import { activeResponses } from "$lib/store";
    import type { MultiSelect } from "$lib/types";
    import { getContext } from "svelte";

    export let component: MultiSelect;
    export let error: string | undefined = undefined;

    const id: number = getContext("id");

    const PLACEHOLDER = "[select something]";
    const OTHER = "Other";

    // Initialize: placeholder is "selected" by default
    $: if ($activeResponses[id].data[component.id] === undefined) {
        $activeResponses[id].data[component.id] = PLACEHOLDER;
    }

    // Internal selection state
    let selected: Set<string> = new Set([PLACEHOLDER]);
    let otherText: string = "";

    // Real selectable options (everything except the placeholder)
    const realOptions: string[] = component.options.filter(o => o !== PLACEHOLDER);

    function toggleOption(option: string) {
        const next = new Set(selected);

        if (next.has(option)) {
            // Deselect this option
            next.delete(option);
            // If nothing real is selected, fall back to placeholder
            if (next.size === 0 || next.has(PLACEHOLDER)) {
                next.clear();
                next.add(PLACEHOLDER);
            }
        } else {
            // Select this option — remove placeholder if present
            next.delete(PLACEHOLDER);
            next.add(option);
        }

        selected = next;
        syncToStore();
    }

    function syncToStore() {
        if (selected.has(PLACEHOLDER) || selected.size === 0) {
            $activeResponses[id].data[component.id] = PLACEHOLDER;
            error = "Please make a selection";
            return;
        }

        // Build output in the order options are declared in the component,
        // replacing "Other" with the typed text when present.
        const parts: string[] = component.options
            .filter(o => o !== PLACEHOLDER && selected.has(o))
            .map(o => {
                if (o === OTHER) {
                    return otherText.trim().length > 0 ? otherText.trim() : OTHER;
                }
                return o;
            });

        $activeResponses[id].data[component.id] = parts.join("; ");
        error = undefined;
    }

    // Re-sync whenever otherText changes
    $: {
        otherText;
        syncToStore();
    }

    $: showOtherBox = selected.has(OTHER);
</script>

<div class="my-2 flex flex-col gap-1.5">
    <!-- Option toggle buttons, one per real option -->
    <div class="flex flex-wrap gap-2">
        {#each realOptions as option}
            {@const isSelected = selected.has(option)}
            <button
                type="button"
                on:click={() => toggleOption(option)}
                class="button clickable transition-all !px-3 !py-1 !font-normal border-2"
                class:!bg-enabled={isSelected}
                class:border-enabled={isSelected}
                class:border-primary={!isSelected}
            >
                {option}
            </button>
        {/each}
    </div>

    <!-- Placeholder badge — visible only when nothing real is selected -->
    {#if selected.has(PLACEHOLDER)}
        <span class="text-sm text-gray-400 italic">{PLACEHOLDER}</span>
    {/if}

    <!-- "Other" text box — only shown when Other is selected -->
    {#if showOtherBox}
        <div class="mt-1">
            <span class="text-sm text-gray-400 mb-1 block">Describe "Other":</span>
            <textarea
                bind:value={otherText}
                placeholder="Specify what happened…"
                on:keydown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                class="flex-auto h-[12vh] min-h-12 max-h-[40vh] bg-primary w-full rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover scroll scrollbar-thin scrollbar-thumb-enabled scrollbar-track-background resize-none"
            ></textarea>
        </div>
    {/if}
</div>