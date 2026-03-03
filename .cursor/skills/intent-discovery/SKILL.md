---
name: intent-discovery
description: This skill guides a user to draft and clarify the intent and scope of a change or feature to be implemented. This skill can be used to create user stories, tasks, plans or other artifacts that will be used to implement code changes.
---

# Intent Discovery Workflow

This workflow uncovers user intent to craft plans for changes or features based on intent and outcomes.

## Critical Rules

### User Story Format

If a user story is created, it should follow the standard format: "As a [role], I want [goal] so that [benefit]"
- Stories MUST be independent, negotiable, valuable, estimable, small, and testable
- Every story MUST have clear requirements and acceptance criteria. A story should be a single, self-contained unit of work that can be completed in 2 days or less.
- If a story or plan is created, it should be saved in `.cursor/plans/` with the format `<plan-title>.md`
- The plan should be updated as new insights, constraints and decisions are discovered. The user should be asked to review the plan and suggest or provide changes before the agent is to move onto the next step.

### User Story Template

```markdown
# User Story: [Title]

## Story
As a [role],
I want [goal/feature]
so that [benefit/value]

## Background

[Context and additional information]

## Acceptance Criteria
- [ ] Given [context], when [action], then [result]

## Technical Notes
- Dependencies:
- Architecture considerations:
- Security implications:
- Unknowns

## Related
- Architecture Decision Records: [links]
- Technical Documentation: [links]
- Dependencies: [story links] or Jira links

Checkpoint: the user is asked to review the document progress so far, suggest or provide changes before the agent is to move onto the next step.


## Examples
