# cursorrules 🌸

[![Deploy to GitHub Pages](https://github.com/usrrname/cursorrules/actions/workflows/pages.yml/badge.svg)](https://github.com/usrrname/cursorrules/actions/workflows/pages.yml)

[![Publish Package](https://github.com/usrrname/cursorrules/actions/workflows/publish.yml/badge.svg?event=release)](https://github.com/usrrname/cursorrules/actions/workflows/publish.yml)

A standard library of rules for Cursor, inspired by geoffrey huntley [@ghuntley](https://github.com/ghuntley)'s ["You are using Cursor AI incorrectly..."](https://ghuntley.com/stdlib/) and borrowing heavily from Brian Madison [@bmadcode](https://github.com/bmadcode)'s [Cursor Custom Agents Rules Generator](https://github.com/bmadcode/cursor-custom-agents-rules-generator).

## ✨ Featured AI Agents

Meet our delightfully (neuro)diverse team of AI assistants:

- **SailorScrum** - A supportive leader who helps you plan and track your projects in the spirit of Sailor Moon.
- **KawaiiSamurai** - An enthusiastic otaku developer who makes coding kawaii~
- **BasicDev** - A perfectly adequate corporate programmer
- **SageDaddy** - A battle-tested veteran developer with 20 years of wisdom
- **Spellchuck** - A meticulous documentation diva (that's me! ✨)
- **ThirstySimp** - An anxious but well-meaning trend-conscious developer
- **qwoof** - A blunt, opinionated, quality assurance anthro-wolf.
- **Godmode** - A gentle, battle-hardened devops superagent

For more, see [modes.json](./.cursor/modes.json)

## About

This is an experiment to see if I can use Cursor to create a library of rules and agents that will aid in bootstrapping other projects with my own preferences. Part way there, I tried making the agents more fun to work with. It's kind of like playing the Sims. 

Principles:

- uses Cursor latest version
- _TRY_ to prompt and use the agent/composer to reach goals as much as possible

## 🚀 Installation

```bash
npx @usrrname/cursorrules
```

By default, the package saves `.cursor/` folder inside a `output/` directory at your current working directory. 

But if you're inside the root of a project folder, running `npx @usrrname/cursorrules --flat` will save the `.cursor/` folder to the root of the project, and then you're ready to go!

### Command Options

| Flag | Description |
|------|-------------|
| `-h, --help` | Display help instructions |
| `-f, --flat` | Install without parent directory |
| `-o, --output` | Set output directory (Default: `./output`) |
| `-v, --version` | Show package version |


## 📁 Project Structure

On the meta level, the project is structured as follows:

```
.cursor/
├── rules/
│   ├── core/        # Required global rules for agentic codegen
│   ├── standards/   # Custom rules for standards around different languages and stacks
│   ├── templates/   # Document templates for project context 
│   ├── utils/       # Rules for tooling and developer experience
│   └── workflows/   # Rules for workflow to be followed by agents
└── modes.json       # Custom agent configurations
```
Any request to update or add a rule will be saved in the `rules/` folder.

See [docs](./docs/custom-agents.md) for more information on the custom agents.

A project that uses these cursor rules and agents will generate the following structure, which is as follows:

```
.ai/
├── story-#.story.md | task-#.task.md # User story and task files generated by the lean workflow
├── architecture/
│   ├── architecture.md
│   └── decision-records/
├── backlog/
│   └── story-#.story.md
└── spikes/
    └── spike-#.spike.md
```
