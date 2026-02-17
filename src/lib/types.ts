export type Response = {
    type: FormType,
    data: Record<string, string | number | boolean>;
    id: number;
    match: number | null;
    team: number;
    scout: string;
    alliance: "RED" | "BLUE" | "ERR";
};

export type Form = {
    sections: Section[];
};

export type Section = {
    type: "section"
    id: string;
    header: string;
    inputs: Input[]
};

export type Input = {
    type: "input";
    label: string;
    tooltip?: string;
    component: Component;
};

export type Component = Counter | Checkbox | Dropdown | Textbox | MultiSelect;

export type Team = {
    number: number;
    name: string;
};

export type Match = {
    number: number;
    red_alliance: Alliance;
    blue_alliance: Alliance;
    red_score?: number;
    blue_score?: number;
}

export type Alliance = [number, number, number]

export type Counter = {
    type: "Counter",
    id: string;
    hasButtons?: boolean;
    initialValue?: number;
    min?: number;
    max?: number;
}

export type Checkbox = {
    type: "Checkbox",
    id: string,
    initialValue?: number,
}

export type Dropdown = {
    type: "Dropdown",
    id: string,
    options: string[],

    // When this value is true, an input
    // box appears instead of a dropbox
    // allowing the user to type in whatever
    // they wish.
    manual?: boolean,

    // A function that will validate the input
    // and return either an error string
    // or undefined if everything is valid.
    // Note: If manual is enabled, this function
    // is only ran when the input textbox loses focus.
    validator: (choice: string) => string | undefined,
}

export type Textbox = {
    type: "Textbox",
    id: string,
    maxLength?: number,
}

/**
 * A multi-select component that allows scouts to pick one or more options.
 *
 * The first entry in `options` MUST be "[select something]" — it acts as a
 * required-placeholder: the form cannot be submitted while it is the active
 * state.  Selecting any real option automatically clears the placeholder.
 * Deselecting all real options restores the placeholder.
 *
 * If "Other" is present in `options`, a free-text box is revealed when the
 * scout selects it.  The typed text replaces the bare word "Other" in the
 * semicolon-separated output that is written to the database.
 *
 * Output format (stored in response.data[id]):
 *   Single selection  → "Score"
 *   Multiple          → "Score; Defend; Collect Fuel"
 *   Other selected    → "Score; whatever the scout typed"
 *   Nothing chosen    → "[select something]"  (triggers an error)
 */
export type MultiSelect = {
    type: "MultiSelect",
    id: string,
    /**
     * Full list of options shown to the scout.
     * Element 0 must be "[select something]".
     * May include "Other" to reveal a free-text box.
     */
    options: string[],
}

export type FormType = {
    name: string,
    type: Form
}