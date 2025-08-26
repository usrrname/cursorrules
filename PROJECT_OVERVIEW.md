# cursorrules 🌸 - Project Overview

## What is cursorrules?

cursorrules is an npm package (`@usrrname/cursorrules`) that provides a comprehensive standard library of rules and configurations for the Cursor AI IDE. Created with "otaku vibes" 🌸, it transforms how developers interact with AI-powered coding assistants by providing structured workflows, custom AI agents, and standardized templates.

## 🎯 Core Purpose

The project addresses the need for:
- **Standardized AI Development Workflows**: Structured approaches to AI-assisted coding
- **Custom AI Agent Personas**: Specialized AI agents for different development roles
- **Project Template Library**: Reusable templates for documentation, architecture, and testing
- **Lean Development Methodology**: Streamlined workflows for agile development with AI assistance

## 🏗️ Architecture Overview

### Package Structure
```
@usrrname/cursorrules/
├── cli.mjs                    # NPX-installable CLI tool
├── .cursor/                   # Core cursor rules and configurations
│   ├── rules/                 # Organized rule library
│   │   ├── core/             # Essential global rules
│   │   ├── standards/        # Language/stack-specific rules  
│   │   ├── templates/        # Documentation templates
│   │   ├── utils/            # Developer experience tools
│   │   └── workflows/        # AI agent collaboration workflows
│   ├── modes.json           # Custom AI agent configurations
│   ├── environment.json     # Environment settings
│   └── mcp.json            # MCP (Model Context Protocol) config
├── docs/                     # Comprehensive documentation
├── test/                     # Test suite
└── img/                     # Assets and branding
```

### Runtime Project Structure (Generated)
When installed in a project, cursorrules creates:
```
your-project/
└── .cursor/
    ├── .ai/                  # AI-generated project memory
    │   ├── story-*.story.md  # User stories
    │   ├── task-*.task.md    # Development tasks
    │   └── architecture/     # Architecture documentation
    └── rules/               # Copied rule library
```

## 🤖 Custom AI Agent System

The project features anime-themed AI agents, each with specialized roles:

### 1. **Sailor Scrum** 🌙
- **Role**: Project Management & Scrum Master
- **Specialization**: User story creation, backlog management, team coordination
- **Powers**: "Moonlight Decision", "Cosmic Prioritization", "Tiara Product Demo"
- **Working Directory**: `.cursor/.ai/backlog/`

### 2. **SageSoftwareDaddy** (SageDaddy) 👨‍💻
- **Role**: Software Architect & Firefighter
- **Specialization**: Technical architecture, proof-of-concepts, system design
- **Focus**: Creating architectural solutions and validating technical feasibility
- **Working Directory**: `.cursor/.ai/architecture/`

### 3. **KawaiiSamurai** ⚔️
- **Role**: Developer Agent
- **Specialization**: Code implementation, development tasks
- **Configuration**: Auto-run enabled, error auto-fixing
- **Focus**: Hands-on coding and implementation

## 🔄 Lean Workflow System

The project implements a structured, test-driven workflow for AI-agent collaboration with clear quality gates:

### Workflow Phases
1. **Story Creation**: Sailor Scrum creates comprehensive user stories in `.cursor/.ai/`
2. **Story Refinement**: Iterative improvement with required sections:
   - Detailed purpose and problems solved
   - Architecture patterns and technical decisions  
   - Technologies, setup, and constraints
   - Unknowns, assumptions, and risks
3. **Architecture Planning**: SageDaddy designs technical solutions with spike support
4. **Implementation**: Test-driven development with continuous progress updates
5. **Completion**: Full test verification and backlog archival
6. **Memory Retention**: Comprehensive documentation of decisions and context

### Quality Gates
- User story approval before architecture planning
- Architecture approval before implementation  
- Spike findings approval before proceeding
- All tests must pass before story completion
- Continuous user feedback and approval required

### Autonomous Agent Actions
Agents may perform without explicit approval:
- Create new story files as needed
- Run unit tests during development
- Update story acceptance criteria and tasks
- Update files with chat logs
- Create feature, bug, or spike branches

### Fair Witness Framework 🪄📜
A sophisticated epistemological framework for AI analysis using five distinct functions:
- **Observer**: What can be directly observed about the topic
- **Evaluator**: Assessment of strengths, weaknesses, and performance  
- **Analyst**: Pattern recognition and mechanism analysis
- **Synthesist**: Integration with broader knowledge contexts
- **Communicator**: Clear explanation of practical implications

This framework enables structured, unbiased analysis while maintaining transparency and avoiding hallucinations through grounded, source-backed responses.

## 🛠️ Key Features

### CLI Tool
```bash
# Install to output directory
npx @usrrname/cursorrules

# Install directly to project root  
npx @usrrname/cursorrules --flat

# Custom output directory
npx @usrrname/cursorrules --output ./my-cursor-rules
```

### Template Library
- **Architecture Documentation**: Technical design templates
- **User Stories**: Structured requirement templates
- **Test Plans**: Comprehensive testing templates
- **Bug Reports**: Standardized issue reporting
- **Architecture Decision Records**: ADR templates

### Automated Release Workflow
- **Changelog Generation**: Automated changelog using Keep a Changelog format
- **Version Management**: Semantic versioning support
- **Release Notes**: Automated release documentation
- **Git Integration**: Tag creation and commit analysis

## 📊 Technical Specifications

- **Language**: JavaScript (ES Modules) with TypeScript support
- **Runtime**: Node.js 18+ 
- **Package Manager**: npm
- **Testing**: Node.js built-in test runner with comprehensive CLI tests
- **CI/CD**: GitHub Actions workflows (pages deployment, PR checks, publish)
- **Documentation**: Markdown-based with Mermaid sequence diagrams
- **Local Development**: Verdaccio local registry support
- **Licensing**: ISC License
- **Dependencies**: Minimal footprint with `varlock` for variable locking

### Development Tools
- TypeScript compilation without emit for type checking
- Automated testing with watch mode for development
- Lint checking via `tsc --noEmit --noImplicitAny`
- Local npm registry setup for testing

## 🚀 Installation & Usage

### Quick Start
```bash
# Install the cursor rules to your project
npx @usrrname/cursorrules --flat

# The package will create a .cursor/ directory with:
# - AI agent configurations
# - Rule library
# - Template collection
# - Workflow definitions
```

### Development Workflow
1. **Initialize**: Install cursorrules in your project
2. **Configure**: Customize agent modes in `.cursor/modes.json`
3. **Create Stories**: Use Sailor Scrum to define requirements
4. **Architect**: Let SageDaddy design the solution
5. **Implement**: Have KawaiiSamurai build the features
6. **Document**: Maintain project memory in `.cursor/.ai/`

## 🔧 Configuration Files

### `.cursor/modes.json`
Defines custom AI agent configurations with specific personalities, capabilities, and constraints.

### `.cursor/environment.json`  
Environment-specific settings and variable definitions.

### `.cursor/mcp.json`
Model Context Protocol configuration for enhanced AI interactions.

## 📈 Project Evolution

The project has evolved through multiple versions:
- **v0.1.0**: Initial release with basic rule system
- **v0.2.x**: Added agent framework and workflows
- **v0.3.0**: Enhanced security and type definitions
- **v0.4.0**: Performance improvements and CI enhancements

## 🎨 Design Philosophy

- **Otaku Aesthetic**: Anime-inspired naming and personality system
- **Lean Methodology**: Streamlined, efficient development processes
- **AI-First**: Designed specifically for AI-assisted development
- **Template-Driven**: Standardized approaches to common development tasks
- **Community-Focused**: Open source with clear contribution guidelines

## 🤝 Contributing

The project welcomes contributions and maintains:
- **Code of Conduct**: Community guidelines for respectful collaboration
- **Contributing Guide**: Detailed contribution instructions with local development setup
- **Issue Templates**: Structured bug reports, feature requests, and pull request templates
- **Security Policy**: Responsible disclosure guidelines
- **Local Development Support**: Verdaccio registry setup for testing package changes

### Development Environment
- Node.js v20+ required
- Verdaccio for local package testing
- Comprehensive test suite with watch mode
- TypeScript for enhanced development experience

## 📚 Documentation Resources

- **README.md**: Primary documentation and quick start guide
- **docs/**: Detailed documentation on workflows and features
- **changelog.md**: Version history and release notes
- **RELEASE_NOTES.md**: Detailed release information

## 🔮 Future Vision

cursorrules represents a new paradigm in AI-assisted development, combining:
- Structured AI agent collaboration
- Template-driven development
- Lean workflow methodologies
- Community-driven rule libraries

The project continues to evolve, adding new agents, templates, and workflow capabilities to support the growing ecosystem of AI-powered development tools.