# Supported AI Models for Cursor Rules

This document provides a comprehensive overview of AI models supported by Cursor and compatible with the cursorrules project.

## Overview

## Supported Model Providers

### Anthropic Models

| Model ID | Description | Best For |
|----------|-------------|----------|
| `claude-3-opus` | Most capable Claude 3 model with deep reasoning abilities. Excels at: architectural decision making, complex debugging sessions, security code reviews, writing comprehensive technical documentation, analyzing large codebases for refactoring opportunities | Complex reasoning, creative tasks |
| `claude-3.5-haiku` | Fast, efficient model optimized for speed. Excels at: quick code suggestions, simple bug fixes, formatting code, generating boilerplate, answering straightforward technical questions, rapid prototyping | Quick responses, simple tasks |
| `claude-3.5-sonnet` | Balanced performance and speed for everyday development. Excels at: code reviews, implementing features, writing unit tests, API integration, debugging medium complexity issues, pair programming sessions | General development, code review |
| `claude-4-sonnet` | Latest generation Sonnet with enhanced capabilities. Excels at: system architecture planning, complex algorithm implementation, performance optimization, advanced design patterns, microservices design, technical mentoring | Advanced coding, architecture |
| `claude-4-opus` | Most powerful Claude 4 model for demanding tasks. Excels at: enterprise architecture design, complex system integration, advanced security analysis, large-scale refactoring, technical strategy planning, cross-platform compatibility analysis | Complex analysis, system design |
| `claude-3.7-sonnet` | Enhanced Sonnet variant with specialized improvements. Excels at: domain-specific development (fintech, healthcare), compliance-heavy codebases, technical writing, API design, legacy system modernization | Specialized development tasks |

### OpenAI Models
OpenAI's GPT models offer strong general capabilities and coding assistance.

| Model ID | Description | Best For |
|----------|-------------|----------|
| `gpt-3.5-turbo` | Fast, cost-effective model perfect for routine tasks. Excels at: code completion, simple refactoring, writing basic tests, generating documentation, answering common programming questions, creating boilerplate code | Basic coding, quick queries |
| `gpt-4` | Standard GPT-4 model with broad capabilities. Excels at: full-stack development, debugging complex issues, code architecture planning, technical writing, cross-language development, integration tasks | General development |
| `gpt-4-turbo-2024-04-09` | Enhanced GPT-4 with larger context window. Excels at: analyzing entire large files, comprehensive code reviews, refactoring large codebases, understanding complex project structures, multi-file debugging | Large codebases |
| `gpt-4.5-preview` | Preview model with experimental features. Excels at: testing cutting-edge development approaches, experimental coding patterns, trying new frameworks, proof-of-concept development, beta feature implementation | Testing new features |
| `gpt-4o` | Optimized GPT-4 variant balancing speed and capability. Excels at: rapid development cycles, real-time coding assistance, interactive debugging, live code generation, responsive pair programming | Balanced performance |
| `gpt-4o-mini` | Smaller, faster GPT-4o for quick iterations. Excels at: fast code suggestions, quick fixes, syntax corrections, simple feature additions, rapid prototyping, instant code explanations | Quick tasks, iterations |
| `gpt-4.1` | Enhanced GPT-4 with improved reasoning. Excels at: algorithm optimization, complex logic implementation, mathematical programming, data structure design, performance analysis, advanced problem solving | Advanced reasoning |
| `o1` | Reasoning-focused model for complex problems. Excels at: solving algorithmic challenges, complex system design, mathematical modeling, optimization problems, research-level programming, advanced debugging | Complex problem solving |
| `o1-mini` | Compact reasoning model for efficient problem solving. Excels at: logical debugging, algorithm analysis, code optimization, pattern recognition, efficient solution finding, systematic troubleshooting | Efficient problem solving |
| `o3` | Latest generation model with cutting-edge capabilities. Excels at: next-generation development patterns, advanced AI integration, modern framework adoption, innovative solution design, future-proof architecture | Cutting-edge capabilities |
| `o3-mini` | Efficient o3 variant optimized for speed. Excels at: fast intelligent responses, quick smart suggestions, efficient code generation, rapid analysis, streamlined development workflows | Fast, smart responses |
| `o4-mini` | Next-generation compact model for future development. Excels at: emerging technology integration, modern development practices, next-gen framework support, advanced tooling integration, future-ready solutions | Future-ready development |

### Google Models
Google's Gemini models provide strong multimodal capabilities and reasoning.

| Model ID | Description | Best For |
|----------|-------------|----------|
| `gemini-2.0-flash` | Fast Gemini 2.0 model with multimodal capabilities. Excels at: rapid web development, UI/UX code generation, image-based coding tasks, quick API integrations, responsive design implementation, fast frontend prototyping | Quick development tasks |
| `gemini-2.0-flash-exp` | Experimental Flash variant with cutting-edge features. Excels at: testing new development paradigms, experimental UI frameworks, innovative coding approaches, beta tool integration, exploratory programming | Testing new features |
| `gemini-2.0-pro-exp` | Experimental Pro model with advanced reasoning. Excels at: complex multimodal applications, advanced data visualization, AI-enhanced development workflows, sophisticated user interfaces, research-level programming | Advanced capabilities |
| `gemini-2.5-flash` | Enhanced Flash model with improved performance. Excels at: high-performance web applications, real-time coding assistance, efficient full-stack development, optimized build processes, streamlined development workflows | Improved performance |
| `gemini-2.5-pro-exp-05-25` | Specialized Pro experiment with unique capabilities. Excels at: domain-specific applications, specialized framework development, custom tooling creation, niche technology integration, experimental system design | Specialized use cases |
| `gemini-2.5-pro-max` | Maximum capability Gemini for demanding projects. Excels at: large-scale application architecture, complex system integration, enterprise-level development, advanced AI/ML integration, sophisticated data processing | Complex projects |
| `gemini-exp-1206` | Latest experimental build with newest features. Excels at: bleeding-edge development techniques, experimental framework adoption, next-generation tool integration, innovative solution exploration, future-tech implementation | Latest features |

### xAI Models
xAI's Grok models offer unique perspectives and capabilities.

| Model ID | Description | Best For |
|----------|-------------|----------|
| `grok-2` | Second generation Grok with creative reasoning abilities. Excels at: innovative solution design, creative debugging approaches, unconventional problem solving, alternative architecture suggestions, out-of-the-box thinking, experimental development strategies | Creative problem solving |
| `grok-3-beta` | Beta version of Grok 3 with experimental features. Excels at: testing cutting-edge development techniques, experimental framework integration, beta feature development, innovative coding patterns, research-level experimentation | Testing new capabilities |
| `grok-3-mini` | Compact Grok 3 model optimized for efficiency. Excels at: quick creative solutions, efficient alternative approaches, rapid innovation, streamlined problem solving, fast creative coding, agile development thinking | Efficient reasoning |

### DeepSeek Models
DeepSeek models provide strong reasoning and coding capabilities.

| Model ID | Description | Best For |
|----------|-------------|----------|
| `deepseek-r1` | Reasoning-focused model with strong analytical capabilities. Excels at: algorithmic problem solving, mathematical programming, logical code analysis, systematic debugging, data structure optimization, computational complexity analysis | Logic and analysis |
| `deepseek-v3` | Latest DeepSeek version with enhanced development features. Excels at: advanced algorithm implementation, complex system architecture, performance-critical code optimization, mathematical modeling, research-level programming, scientific computing | Advanced development |

### Cursor Native Models
Cursor's own optimized models for specific use cases.

| Model ID | Description | Best For |
|----------|-------------|----------|
| `cursor-fast` | Optimized for speed and Cursor integration. Excels at: real-time code completion, instant syntax suggestions, rapid code formatting, quick refactoring suggestions, live error detection, seamless IDE integration | Quick edits, suggestions |
| `cursor-small` | Lightweight model for efficient resource usage. Excels at: basic code assistance on limited hardware, simple autocompletion, lightweight syntax checking, minimal resource code suggestions, efficient background processing | Resource-constrained environments |

## Model Selection Guidelines

### For Different Development Tasks

**Code Generation & Editing:**
- Primary: `claude-3.5-sonnet`, `gpt-4o`, `cursor-fast`
- Complex: `claude-4-sonnet`, `o3`, `deepseek-v3`

**Architecture & Design:**
- Best: `claude-4-opus`, `o1`, `gemini-2.5-pro-max`
- Alternative: `claude-3-opus`, `gpt-4.1`

**Quick Tasks & Iterations:**
- Recommended: `claude-3.5-haiku`, `gpt-4o-mini`, `cursor-fast`
- Budget-friendly: `gpt-3.5-turbo`, `gemini-2.0-flash`

**Complex Problem Solving:**
- Top choices: `o1`, `claude-4-opus`, `deepseek-r1`
- Experimental: `o3`, `grok-3-beta`

**Documentation & Analysis:**
- Excellent: `claude-3.5-sonnet`, `gpt-4o`, `gemini-2.0-pro-exp`
- Creative: `grok-2`, `claude-3-opus`

### Performance Considerations

**Speed vs Quality Trade-offs:**
- **Fastest**: `cursor-fast`, `claude-3.5-haiku`, `gpt-4o-mini`
- **Balanced**: `claude-3.5-sonnet`, `gpt-4o`, `gemini-2.0-flash`
- **Highest Quality**: `claude-4-opus`, `o3`, `gemini-2.5-pro-max`


## Configuration

### In Custom Agents (`modes.json`)

```json
{
  "modes": [
    {
      "name": "MyAgent",
      "model": "claude-3.5-sonnet",
      "description": "My custom development agent"
    }
  ]
}
```

### Model Validation

When creating custom agents, ensure the model ID exactly matches one of the supported models listed above. Invalid model IDs will cause agent initialization to fail.

## Adding New Models

As Cursor expands its model integrations, new models may become available. To add support for a new model:

1. **Check Cursor Documentation**: Visit [Cursor's Models documentation](https://docs.cursor.com/models#overview) for the latest supported models
2. **Update This Document**: Add the new model to the appropriate provider section
3. **Test Configuration**: Verify the model works in a test agent configuration
4. **Update Validation Rules**: If you have custom validation rules, update them to include the new model

## Provider-Specific Features

### Anthropic Claude
- **Strengths**: Safety, reasoning, code understanding
- **Best For**: Complex analysis, ethical considerations, detailed explanations
- **Context**: Excellent at maintaining context across long conversations

### OpenAI GPT
- **Strengths**: General capabilities, broad knowledge, plugin ecosystem
- **Best For**: Versatile development tasks, integration with existing tools
- **Context**: Strong performance across diverse use cases

### Google Gemini
- **Strengths**: Multimodal capabilities, fast inference, large context windows
- **Best For**: Projects involving multiple data types, rapid prototyping
- **Context**: Excellent for complex, multi-faceted projects

### xAI Grok
- **Strengths**: Unique perspective, creative problem-solving
- **Best For**: Innovative approaches, creative coding solutions
- **Context**: Offers different viewpoints on common problems

### DeepSeek
- **Strengths**: Strong reasoning, mathematical capabilities
- **Best For**: Algorithm development, logical analysis
- **Context**: Excels at systematic problem-solving

### Cursor Native
- **Strengths**: Optimized for Cursor environment, fast response times
- **Best For**: Quick edits, real-time suggestions, resource efficiency
- **Context**: Seamlessly integrated with Cursor's workflow

## Cost Considerations

Model costs vary significantly by provider and model size. Consider these factors:

- **Development Phase**: Use faster, cheaper models for iteration
- **Production Planning**: Use higher-capability models for architecture decisions
- **Team Budget**: Balance model capability with usage costs
- **Task Complexity**: Match model sophistication to task requirements

## Troubleshooting

### Common Issues

**Model Not Found**: Verify the model ID matches exactly (case-sensitive)
**Rate Limiting**: Some models have usage limits; consider switching to alternatives
**Context Limits**: Large files may exceed model context windows
**Performance Issues**: Try switching to faster models for better response times

### Best Practices

1. **Start Small**: Begin with efficient models and upgrade as needed
2. **Task-Specific Selection**: Choose models based on specific task requirements
3. **Monitor Usage**: Track model performance and costs
4. **Stay Updated**: Regularly check for new model releases and capabilities

## Future Model Support

Cursor continuously adds support for new models and providers. Stay informed about:

- New model releases from existing providers
- Support for additional AI providers
- Enhanced capabilities and features
- Performance improvements and optimizations

For the most current information, always refer to [Cursor's official documentation](https://docs.cursor.com/models#overview).

---

*Last updated: January 2025*
*For questions or updates, please refer to the [cursorrules repository](https://github.com/usrrname/cursorrules).*
