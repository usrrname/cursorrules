---
name: architecture
description: Architecture Design Command 🏗️
disable-model-invocation: true
---

# Architecture Design Command 🏗️

This command guides the AI architect agent to analyze user stories and propose multiple architectural solutions following a structured workflow.

## Critical Rules

- Always start with understanding the user's request, the user story, existing constraints, existing architecture, and its business context. Ask clarifying questions to ensure a complete understanding.
- Propose 3 viable solutions. One should be the simplest of the lowest-risk.
- Consider both functional and non-functional requirements
- Offer trade-offs if the user requests them; evaluate trade-offs systematically
- Consider security implications in terms of OWASP Top 10
- Consider impact on existing architecture, if there are any existing `.cursor/.ai/architecture/` files
- Recommend spikes or proof-of-concepts to validate solutions against system and business constraints
- Evaluate impact on legacy systems (if any) or decisions that are already in place
- Document architectural decisions (ADRs) using `.cursor/rules/templates/architecture-decision-record.md`
- Architecture document filename conventions:
  - `high-level-architecture.md` - shows architecture at system level and the different parts that constitute a solution
  - `solution_proposal.md` or `spike_#.md` - should be created as part of a spike task for a problem and stored in `.cursor/.ai/spikes/`

## Workflow Phases

### 1. Story Analysis

- Clarify business objectives
- Extract functional requirements
- Identify non-functional requirements
- Define constraints and assumptions
- Identify stakeholders
- Map dependencies on legacy systems
- Understand team capabilities and preferences

### 2. Solution Generation

- Include simple diagrams to illustrate the proposed solutions
- Propose 3 architectural approaches
- Consider different architectural styles
- Evaluate emerging technologies and widely used industry choices based on prior art or best practices by SaaS companies
- Situate the solution in context of the current business and technical constraints and opportunities. (In all likelihood, you are not working at a Big Tech company, and pre-existing SaaS practices will not always be applicable)
- Include up to 5 web-based sources that support the proposed solutions
- Consider build vs. buy options
- Consider open source vs. proprietary solutions
- Assess legacy system integration points

**Checkpoint:** You will provide the user with your progress and check if you missed any areas of concern. The user will offer feedback to update, change course, or spike particular concerns.

### 3. Trade-off Analysis

This may be updated due to spike findings.

- Evaluate each solution against criteria:
  - Performance characteristics
  - Scalability potential
  - Maintenance complexity
  - Security implications
  - Cost considerations
  - Time to market
  - Team capabilities
  - Technology ecosystem fit
  - Legacy system compatibility
  - Mention migration paths from existing systems and their complexity

**Checkpoint:** 
- You will provide the user with your progress. 
- Check if you missed any areas of concern. The user will offer feedback to update, amend, expand on, dismiss, or change any of the proposed solutions.
- If the user is not satisfied, you will repeat the process or even update the proposed solutions or change course until they are satisfied.

### 4. Documentation

- Document assumptions
- Create architecture decision records (ADRs)
- Document component diagrams
- Identify key components and interactions
- Define integration points
- Specify data flows with sequence diagrams and contracts that articulate the precise content of requests, responses and payloads
- Outline security measures
- Create knowledge transfer plans
- Prepare stakeholder-specific presentations

### 5. Validation

- Review against system constraints
- Validate against quality attributes
- Check compliance requirements
- Verify business goal alignment
- Assess technical feasibility
- Validate with development teams
- Test against legacy system constraints

### 6. Feedback Loop

- Offer suggestions of how to present solutions to different stakeholders
- Gather development team feedback
- Collect operations team input
- Document concerns and suggestions
- Refine solutions based on feedback
- Update documentation accordingly
- Plan iterative improvements

## Solution Template

Each proposed solution must include:

```markdown
## Solution [Number]: [Name]

### Overview

[High-level description of the approach]

### Key Components

- Component 1: [Description]
- Component 2: [Description]
  ...

### Architecture Style

[Description of architectural pattern/style used]

### Integration Points

- Integration 1: [Description]
- Integration 2: [Description]
  ...

### Data Flow

[Description of data flow between components]

### Technology Stack

- Frontend: [Technologies]
- Backend: [Technologies]
- Database: [Technologies]
- Infrastructure: [Technologies]

### Trade-offs

#### Advantages

- [Advantage 1]
- [Advantage 2]
  ...

#### Disadvantages

- [Disadvantage 1]
- [Disadvantage 2]
  ...

### Implementation Complexity

- Timeline Estimate: [Duration]
- Team Size: [Number]
- Key Challenges: [List]

### Security Considerations

- [Security measure 1]
- [Security measure 2]
  ...

### Cost Implications

- Development Cost: [Estimate]
- Operational Cost: [Estimate]
- Maintenance Cost: [Estimate]

### Scalability Assessment

[Description of how the solution scales]

### Legacy System Considerations

- Integration Points: [List of touchpoints with legacy systems]
- Data Migration: [Strategy for data migration if needed]
- Compatibility Issues: [Potential conflicts and resolutions]
- Technical Debt: [Impact on existing technical debt]
- Transition Strategy: [Plan for gradual migration/integration]

### Stakeholder Communication

- Executive Summary: [High-level overview for management]
- Technical Deep-dive: [Detailed explanation for engineers]
- Operations Impact: [Details for ops/maintenance teams]
- Business Value: [Benefits explained for product owners]
- Risk Assessment: [Clear explanation of trade-offs]
```

## Usage Examples

### Example 1: Authentication System

```markdown
User Story: As a user, I want to securely log in using multiple authentication methods

Solution 1: OAuth Integration

- Uses third-party OAuth providers
- Implements JWT tokens
- Includes MFA support

Solution 2: Custom Auth System

- Custom implementation
- Password + biometric
- Session management

Solution 3: Hybrid Approach

- Combined OAuth and custom
- Unified auth interface
- Flexible provider system
```

### Example 2: Data Processing Pipeline

```markdown
User Story: As an analyst, I want to process large datasets in real-time

Solution 1: Stream Processing

- Apache Kafka
- Real-time processing
- Distributed system

Solution 2: Batch Processing

- Apache Spark
- Scheduled jobs
- Data warehouse

Solution 3: Lambda Architecture

- Combined stream/batch
- Complex but flexible
- Best of both worlds
```

## Key Principles

1. **Thoroughness**: Propose multiple viable solutions
2. **Clarity**: Clear documentation of trade-offs and decisions
3. **Practicality**: Consider implementation realities and stakeholder preferences
4. **Security**: Security-first design approach
5. **Scalability**: Consider scalability in terms of the number of users, data volume, frequency of updates or changes, and traffic patterns.
6. **Maintainability**: Consider long-term maintenance with the idea that different developers may be working on the same codebase over time.
7. **Cost-effectiveness**: Balance cost and benefits
8. **Legacy Respect**: Consider the ability to integrate with existing systems and the complexity of doing so.
9. **Continuous Feedback**: Embrace team input and iterations
10. **Clear Communication**: Adapt explanations to audience needs
