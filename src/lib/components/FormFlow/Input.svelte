<script lang="ts">
	import type { Input } from "$lib/types";
	import Checkbox from "./Checkbox.svelte";
	import Counter from "./Counter.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Textbox from "./Textbox.svelte";
	import MultiSelect from "./MultiSelect.svelte";
	import Tooltip from "./Tooltip.svelte";

    export let input: Input;

    let component = input.component as never;

    let components = {
        "Dropdown": Dropdown,
        "Checkbox": Checkbox,
        "Counter": Counter,
        "Textbox": Textbox,
        "MultiSelect": MultiSelect,
    };

    let Component = components[input.component.type];
    export let error: string | undefined;
</script>

<div 
    class="justify-between items-center gap-2"
    class:sm:flex={input.component.type != "Textbox" && input.component.type != "MultiSelect"}
    class:flex={input.component.type == "Checkbox"}
    >
    <span
        class="text-xl min-w-max"
        >
        {input.label}
        {#if input.tooltip}
            <Tooltip content={input.tooltip} />
        {/if}
    </span>
    <Component {component} bind:error/>
</div>
