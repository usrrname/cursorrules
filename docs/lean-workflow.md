# Lean Workflow Process

This document illustrates the lean workflow process using a sequence diagram.

```mermaid
sequenceDiagram
    participant U as User
    participant SS as SailorScrum
    participant SD as SageDaddy
    participant AI as .ai/ Directory
    participant CR as .cursor/rules/
    participant T as Tests

    Note over U,CR: Workflow Initialization
    SS->>AI: Check for existing user story
    alt No user story exists
        SS->>CR: Reference user story template
        SS->>U: Request to create user story
        U->>SS: Provide story details
        SS->>AI: Create .ai/story-#.md
    end

    Note over U,CR: Story Refinement
    loop Until Story Approved
        SS->>AI: Review user story content
        SS->>AI: Verify required sections
        Note right of SS: - Purpose & problems solved<br/>- Architecture patterns<br/>- Technical decisions<br/>- Technologies & constraints<br/>- Risks & assumptions
        SS->>U: Request improvements/approval
        U->>SS: Provide feedback/approval
        SS->>AI: Update user story
    end

    Note over U,CR: Architecture Planning
    SS->>SD: Notify story approved
    SD->>CR: Reference architecture template
    SD->>AI: Generate .ai/architecture.md draft
    SD->>U: Present architecture for review
    
    loop Until Architecture Approved
        alt Technical Discovery Needed
            U->>SD: Request spike investigation
            SD->>CR: Reference dev-spike rules
            SD->>U: Present spike findings
            U->>SD: Approve spike findings
        end
        U->>SD: Provide feedback/approval
        SD->>AI: Update architecture doc
    end

    Note over U,CR: Story Implementation
    SD->>CR: Reference story template
    SD->>AI: Create story/task file
    Note right of SD: Format: story-N.story.md<br/>or task-N.story.md
    SD->>U: Present story for approval
    U->>SD: Approve story
    
    loop Until Story Complete
        Note over SD,T: TDD Process
        SD->>T: Run tests
        T->>SD: Report test results
        SD->>AI: Update story progress
        Note right of SD: - Current state<br/>- Next steps<br/>- Chat log<br/>- Subtask status
        alt Test Failure
            SD->>U: Request guidance
            U->>SD: Provide direction
        end
        SD->>U: Present progress
    end

    Note over U,CR: Story Completion
    SD->>T: Verify ALL tests pass
    T->>SD: Confirm test status
    SD->>AI: Update story status to Done
    SD->>AI: Move to .ai/backlog/done
    SD->>U: Notify story completion

    Note over U,CR: Memory Retention
    SS->>AI: Update chat logs
    SS->>AI: Document decisions
    SS->>AI: Record technical context
```

## Key Components

1. **User**: Provides requirements, feedback, and approvals throughout the process.
2. **SailorScrum**: Manages user story creation, refinement, and memory retention.
3. **SageDaddy**: Handles architecture planning, implementation, and TDD process.
4. **.ai/ Directory**: Core memory system storing all project documentation and stories.
5. **.cursor/rules/**: Contains templates and workflow rules.
6. **Tests**: Ensures code quality through TDD practices.

## Process Phases

1. **Workflow Initialization**: Ensures a proper user story exists with all required sections.
2. **Story Refinement**: Iterates on the user story until it meets quality standards, including:
   - Detailed purpose and problems solved
   - Architecture patterns and technical decisions
   - Technologies, setup, and constraints
   - Unknowns, assumptions, and risks
3. **Architecture Planning**: Creates and refines the technical architecture, with support for technical spikes.
4. **Story Implementation**: 
   - Follows TDD practices
   - Continuously updates story progress
   - Maintains chat logs and technical context
   - Updates subtask completion status
5. **Story Completion**: 
   - Verifies ALL tests pass
   - Archives completed story in backlog
6. **Memory Retention**: Maintains comprehensive documentation of:
   - Technical decisions
   - Chat interactions
   - Implementation context

## Quality Gates

- User story must be approved before architecture planning
- Architecture must be approved before implementation
- Spike findings must be approved before proceeding
- Stories must pass all tests before completion
- Continuous feedback and approval from the user
- No duplication of business/technical context between user story and architecture documents

## Autonomous Actions

Agents may perform these actions without explicit user approval:
1. Create new story files when needed
2. Run unit tests during development
3. Update story acceptance criteria and tasks
4. Update story files with chat logs
5. Create feature, bug, or spike branches



