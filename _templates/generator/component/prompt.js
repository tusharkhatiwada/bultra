module.exports = [
  {
    type: "input",
    name: "path",
    message: "Where should the component go?",
    initial: "components",
  },
  {
    type: "input",
    name: "name",
    message: "What's the name of the component?",
  },
  {
    type: "multiselect",
    name: "files",
    message: "What files do you want to create?",
    hint: "(Use <space> to select, <return> to submit)",
    initial: ["styles"],
    symbols: { indicator: { on: "●", off: "○" } },
    choices: [{ name: "styles", value: "Styles file" }],
  },
]
