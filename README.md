# cursorrules

[![Deploy to GitHub Pages](https://github.com/usrrname/cursorrules/actions/workflows/pages.yml/badge.svg)](https://github.com/usrrname/cursorrules/actions/workflows/pages.yml)

[![Publish Package](https://github.com/usrrname/cursorrules/actions/workflows/publish.yml/badge.svg?event=release)](https://github.com/usrrname/cursorrules/actions/workflows/publish.yml)

A standard library of rules for Cursor, inspired by geoffrey huntley [@ghuntley](https://github.com/ghuntley)'s ["You are using Cursor AI incorrectly..."](https://ghuntley.com/stdlib/) and borrowing heavily from Brian Madison [@bmadcode](https://github.com/bmadcode)'s [Cursor Custom Agents Rules Generator](https://github.com/bmadcode/cursor-custom-agents-rules-generator).

## About

This is an experiment to see if I can use cursor to create a library of rules and agents that I can use to bootstrap other projects with my own preferences. Part way there, I ended up seeing whether I could give personality to the agents so they were more fun to work with. It's kind of like playing the Sims. 

- uses Cursor 0.48.8 (latest)
- _TRY_ to prompt and use the agent/composer to reach goals as much as possible

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
See [docs](./docs/custom-agents.md) for more information on the custom agents.

On the project level, a project that uses these cursor rules and agents will have its own structure, which is as follows:

```
.ai/
├── architecture/
│   ├── ###-architecture.md
│   └── decision-records/
├── backlog/
│   └── ###-user-story-title.md
└── spikes/
    └── ####-spike-title.md
```

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

## 🧪 Local Development

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Setup Steps

1. Install Verdaccio:
   ```bash
   npm install -g verdaccio
   ```

2. Start Verdaccio:
   ```bash
   verdaccio  # Use --config config/verdaccio.yml for custom configuration
   ```

3. Configure local registry:
   ```bash
   # Set registry
   npm config set @usrrname:registry http://localhost:4873/
   
   # Verify registry setting
   npm config get @usrrname:registry
   ```

4. Build and publish:
   ```bash
   npm publish
   ```

5. Test the package:
   ```bash
   npx @usrrname/cursorrules
   ```

6. Clean up test versions:
   ```bash
   npm unpublish @usrrname:registry http://localhost:4873/ @usrrname/cursorrules
   ```

🚧 Under construction 🚧

### MCP Setup

[About Model Context Protocol](https://github.com/modelcontextprotocol)


