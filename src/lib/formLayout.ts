import type { Form, FormType } from "./types";

export const ScoutingForm: Form = {
    sections: [
        {
            type: "section",
            id: "Auto",
            header: "Auto",
            inputs: [
                {
                    type: "input",
                    label: "Score Hub",
                    tooltip: "Did this team score in the hub in auto?",
                    component: {
                        type: "Checkbox",
                        id: "auto score hub"
                    }
                },
                {
                    type: "input",
                    label: "Leave Alliance Zone",
                    tooltip: "Did this team leave their alliance zone (aka enter the neutral zone)?",
                    component: {
                        type: "Checkbox",
                        id: "auto leave"
                    }
                },
                {
                    type: "input",
                    label: "Auto Climb",
                    tooltip: "Did this team climb in auto?",
                    component: {
                        type: "Checkbox",
                        id: "auto climb"
                    }
                }
            ]
        },
        {
            type: "section",
            id: "Teleop",
            header: "Teleop",
            inputs: [
                {
                    type: "input",
                    label: "Score Hub",
                    tooltip: "Did this team score in the hub in Teleop?",
                    component: {
                        type: "Checkbox",
                        id: "score hub"
                    }
                },
                {
                    type: "input",
                    label: "Defense",
                    tooltip: "Did this team play defense at all in the game? Colliding with opponents once does not count as defense, but is this robot actively preventing robot(s) from getting somewhere?",
                    component: {
                        type: "Checkbox",
                        id: "defense"
                    }
                },
                {
                    type: "input",
                    label: "Got Defended",
                    tooltip: "Did this team get defended, or in other words, was this team trying to get somewhere but was actively being targeted by robot(s)?",
                    component: {
                        type: "Checkbox",
                        id: "got defended"
                    }
                },
                {
                    type: "input",
                    label: "Trench",
                    tooltip: "Did this team go under the trench at all during the match? If so, was it hard for them to go under the trench, or did they do it almost effortlessly?",
                    component: {
                        type: "Dropdown",
                        id: "trench",
                        options: ["Did Not Attempt", "Struggled With", "Attempted Successfully"],
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Bump",
                    tooltip: "Did this team go over the bump at all during the match? If so, was it hard for them to go over the bump, or did they do it almost effortlessly?",
                    component: {
                        type: "Dropdown",
                        id: "bump",
                        options: ["Did Not Attempt", "Struggled With", "Attempted Successfully"],
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Alliance Shifts",
                    tooltip: "What did this team do during their alliance shifts (there are two 25-second alliance shifts per match)?",
                    component: {
                        type: "MultiSelect",
                        id: "alliance shifts",
                        options: [
                            "[select something]",
                            "Score",
                            "Ferry/Pass to Alliance Partners",
                            "Defend",
                            "Did Nothing/Was Immobile",
                            "Collect Fuel",
                            "Other"
                        ]
                    }
                },
                {
                    type: "input",
                    label: "Off Shifts",
                    tooltip: "What did this team do during their off-shifts (there are two 25-second off-shifts per match)?",
                    component: {
                        type: "MultiSelect",
                        id: "off shifts",
                        options: [
                            "[select something]",
                            "Score",
                            "Ferry/Pass to Alliance Partners",
                            "Defend",
                            "Did Nothing/Was Immobile",
                            "Collect Fuel",
                            "Other"
                        ]
                    }
                },
                {
                    type: "input",
                    label: "Driving",
                    tooltip: "How good was their driving? Did they get in the way of their alliance partners? Was their driving smooth or jerky?",
                    component: {
                        type: "Textbox",
                        id: "driving"
                    }
                },
                {
                    type: "input",
                    label: "Intaking",
                    tooltip: "How good was their intaking? Was it efficient and/or effective?",
                    component: {
                        type: "Textbox",
                        id: "intaking"
                    }
                },
                {
                    type: "input",
                    label: "Scoring Precision",
                    tooltip: "How accurate was their scoring? Did they miss a lot, drop pieces, struggle to score from certain areas?",
                    component: {
                        type: "Textbox",
                        id: "precision"
                    }
                },
                {
                    type: "input",
                    label: "Issues",
                    tooltip: "Did they encounter any problems? Did fuel get stuck, did they stop moving, did something fall off, etc.?",
                    component: {
                        type: "Textbox",
                        id: "issues"
                    }
                }
            ]
        },
        {
            type: "section",
            id: "endgame",
            header: "Endgame",
            inputs: [
                {
                    type: "input",
                    label: "Endgame",
                    tooltip: "What is their endgame state?",
                    component: {
                        type: "Dropdown",
                        id: "endgame",
                        options: ["None", "L1", "L2", "L3"],
                        validator: (choice: string) => undefined
                    }
                }
            ]
        },
        {
            type: "section",
            id: "other",
            header: "Other",
            inputs: [
                {
                    type: "input",
                    label: "Other Comments",
                    tooltip: "What other things did you notice about the team? Are there any glaring concerns, like reliability issues?",
                    component: {
                        type: "Textbox",
                        id: "comments"
                    }
                },
                {
                    type: "input",
                    label: "Penalties",
                    tooltip: "What kind of penalties did this team commit during the match?",
                    component: {
                        type: "Textbox",
                        id: "penalties"
                    }
                }
            ]
        }
    ]
}

export const PitScoutingForm: Form = {
    sections: [
        {
            type: "section",
            id: "capabilities",
            header: "Capabilities",
            inputs: [
                {
                    type: "input",
                    label: "Robot Preferred Fuel Capacity",
                    tooltip: "What is the fuel capacity that this team wants to use optimally?",
                    component: {
                        type: "Textbox",
                        id: "preferred fuel capacity"
                    }
                },
                {
                    type: "input",
                    label: "Actual Fuel Capacity",
                    tooltip: "What is the absolute maximum fuel capacity the robot can hold realistically?",
                    component: {
                        type: "Textbox",
                        id: "fuel capacity"
                    }
                },
                {
                    type: "input",
                    label: "Score Hub",
                    tooltip: "Can this team score in the hub?",
                    component: {
                        type: "Checkbox",
                        id: "score hub"
                    }
                },
                {
                    type: "input",
                    label: "Trench",
                    tooltip: "Can this team go under the trench?",
                    component: {
                        type: "Checkbox",
                        id: "trench"
                    }
                },
                {
                    type: "input",
                    label: "Bump",
                    tooltip: "Is this team willing to go over the bump, or do they prefer not to?",
                    component: {
                        type: "Dropdown",
                        id: "bump",
                        options: ["Go Over the Bump", "Prefer Not To"],
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "L1 Climb (AUTO)",
                    tooltip: "Can this team climb in auto?",
                    component: {
                        type: "Checkbox",
                        id: "auto l1 climb"
                    }
                },
                {
                    type: "input",
                    label: "L1 Climb (ENDGAME)",
                    tooltip: "Can this team climb L1 in endgame?",
                    component: {
                        type: "Checkbox",
                        id: "l1 climb"
                    }
                },
                {
                    type: "input",
                    label: "L2 Climb (ENDGAME)",
                    tooltip: "Can this team climb L2 in endgame?",
                    component: {
                        type: "Checkbox",
                        id: "l2 climb"
                    }
                },
                {
                    type: "input",
                    label: "L3 Climb (ENDGAME)",
                    tooltip: "Can this team climb L3 in endgame?",
                    component: {
                        type: "Checkbox",
                        id: "l3 climb"
                    }
                }
            ]
        },
        {
            type: "section",
            id: "robot info",
            header: "Robot Information",
            inputs: [
                {
                    type: "input",
                    label: "Drivetrain",
                    tooltip: "What type of drivetrain does this team have?",
                    component: {
                        type: "Dropdown",
                        id: "drivetrain",
                        options: ["[select something]", "Swerve", "Tank", "Other"],
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Intake",
                    tooltip: "What type of intake does this team have?",
                    component: {
                        type: "Dropdown",
                        id: "intake",
                        options: ["[select something]", "Outpost", "Ground", "Both Outpost and Ground", "Other"],
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Weight (lbs)",
                    component: {
                        type: "Counter",
                        id: "weight",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Width (inches)",
                    tooltip: "How wide is the robot, in inches? The response to this can be empty.",
                    component: {
                        type: "Counter",
                        id: "width",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Length (inches)",
                    tooltip: "How long is the robot, in inches? The response to this can be empty.",
                    component: {
                        type: "Counter",
                        id: "length",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Width WITH BUMPERS (inches)",
                    component: {
                        type: "Counter",
                        id: "width with bumpers",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Length WITH BUMPERS (inches)",
                    component: {
                        type: "Counter",
                        id: "length with bumpers",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Retracted Height (inches)",
                    tooltip: "How tall is their robot when no mechanisms are extended?",
                    component: {
                        type: "Counter",
                        id: "retracted height",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Extended Height (inches)",
                    tooltip: "How tall is their robot when all vertical extensions are enabled?",
                    component: {
                        type: "Counter",
                        id: "extended height",
                        initialValue: 0,
                        hasButtons: false
                    }
                }
            ]
        },
        {
            type: "section",
            id: "comments",
            header: "Comments",
            inputs: [
                {
                    type: "input",
                    label: "Autos",
                    tooltip: "What type of autos does this team have? Be specific: tell me how many game pieces, where they start, how long it takes, how effective/efficient it is, and overall what they do during that autonomous.",
                    component: {
                        type: "Textbox",
                        id: "autos"
                    }
                },
                {
                    type: "input",
                    label: "How Do They Climb",
                    tooltip: "How do they climb on the tower? Tell me how long it takes them to line up + climb.",
                    component: {
                        type: "Textbox",
                        id: "how climb"
                    }
                },
                {
                    type: "input",
                    label: "Driver Experience",
                    tooltip: "How experienced are the drivers?",
                    component: {
                        type: "Textbox",
                        id: "driver experience"
                    }
                },
                {
                    type: "input",
                    label: "Preferences",
                    tooltip: "What preferences do they have? Starting position, roles during alliance/off-shifts, position in the tower, trench vs. bump, etc.",
                    component: {
                        type: "Textbox",
                        id: "preferences"
                    }
                },
                {
                    type: "input",
                    label: "Comments",
                    tooltip: "Any other comments?",
                    component: {
                        type: "Textbox",
                        id: "general comments"
                    }
                },
                {
                    type: "input",
                    label: "Reliability Issues",
                    tooltip: "Are there some things they are not comfortable with (such as the climb not being very reliable or the auto not working too well)?",
                    component: {
                        type: "Textbox",
                        id: "reliability issues"
                    }
                }
            ]
        },
        {
            type: "section",
            id: "miscellaneous",
            header: "Miscellaneous",
            inputs: [
                {
                    type: "input",
                    label: "Miscellaneous",
                    tooltip: "Anything else that does not fit in any other question.",
                    component: {
                        type: "Textbox",
                        id: "miscellaneous"
                    }
                },
                {
                    type: "input",
                    label: "Favourite Colour",
                    tooltip: "The team's favourite colour!",
                    component: {
                        type: "Textbox",
                        id: "fave colour"
                    }
                }
            ]
        }
    ]
}

export const formTypes: FormType[] = [
    {
        name: "Scouting",
        type: ScoutingForm
    },
    {
        name: "Pit Scouting",
        type: PitScoutingForm
    }
]
