## User Story Template {title} {PBI #}

Status: { Draft | Review | Blocked | ToDo | In Progress | Done | Dropped }

This is a user story template that you can use to document user stories for your software development projects. User stories follow the "As a [role], I want [an action or feature], so that [a reason or benefit]" format, and they help define the functionality and requirements of a feature or improvement.

### Story Definition

```markdown
**As a [role],**
**I want [an action or feature],**
**So that [a reason or benefit].**

**Acceptance Criteria:**
- [ ] Criteria 1: Describe the first acceptance criterion here.
- [ ] Criteria 2: Describe the second acceptance criterion here.
- [ ] Criteria 3: Describe additional criteria as needed.

**Definition of Done:**
- [ ] All acceptance criteria are met.
- [ ] Code is reviewed and approved.
- [ ] Necessary tests critical to business functionality are written and pass.
- [ ] Documentation is updated such that a new onboarding developer can understand how to operate the software.
- [ ] Feature is deployed to the [environment name].
```

1. Customize the template by replacing [role], [an action or feature], [a reason or benefit], and the acceptance criteria with your specific project details. Be as clear and detailed as possible to accurately describe the user story.

2. Add any additional information or context that is relevant to your project or team.

### Example

<example>
    ```md
    **As a customer,**
    **I want to be able to save my favorite products to a wishlist,**
    **So that I can easily find and purchase them later without searching.**

    **Acceptance Criteria:**
    - [ ] The "Add to Wishlist" button is displayed next to each product.
    - [ ] When I click "Add to Wishlist," the product is added to my wishlist.
    - [ ] I can view my wishlist, see the list of saved products, and remove products from the wishlist.
    - [ ] The wishlist persists between sessions, so I can access it even after closing the application.

    **Definition of Done:**
    - [ ] All acceptance criteria are met.
    - [ ] Code is reviewed and approved.
    - [ ] Automated tests for wishlist functionality pass.
    - [ ] Documentation is updated with information on how to use the wishlist feature.
    - [ ] Feature is deployed to the production environment.
    ```
</example>

## Context (optional)

{
   - Background information
   - Current state
   - Story justification
   - Technical context
   - Business drivers
   - Related history from previous stories (if any)
}

## Chat Command Log 

This section is for logging the chat exchange between the user and the AI agents that are used to create the user story.

<example>

- user: Create a user story for a new feature
- ....
- AiAgent: User story created, proceeding with acceptance criteria
- BMad: Why are you making so many different user stories?
- AiAgent: I am just following your instructions
- user: I only asked for one user story
- AiAgent: I will correct that now
- ....
- AiAgent: User story updated, proceeding with acceptance criteria
- ....

  </example>