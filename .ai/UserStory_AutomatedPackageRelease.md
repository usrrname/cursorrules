# 🌙 User Story: Automated Package Release Workflow

## 💫 Story
**As a** maintainer of the @usrrname/cursor-rules package,  
**I want** an automated workflow that publishes the package to both npm and GitHub registries when a release is created,  
**So that** I can streamline the release process and ensure consistent distribution across multiple package registries.

## 🌟 Acceptance Criteria

1. **GitHub Workflow Triggers:**
   - Workflow activates automatically when a new GitHub release is created with a tag (e.g., v1.0.0)
   - Workflow also runs when a tagged commit is merged into the main branch

2. **npm Registry Publishing:**
   - Package is automatically published to the npm registry under the @usrrname scope
   - Version number matches the GitHub release tag
   - Proper authentication with npm is handled securely
   - README, LICENSE, and other essential files are included in the published package

3. **GitHub Package Registry Publishing:**
   - Same package version is published to the GitHub Package Registry
   - Package is accessible under the @usrrname organization in the GitHub registry
   - Proper GitHub authentication is handled within the workflow

4. **Validation and Testing:**
   - Package contents are validated before publishing
   - Basic smoke tests run to ensure package can be installed and imported
   - Failed publications do not mark the release as complete

5. **Notifications:**
   - Workflow success or failure notifications are sent
   - Release notes from GitHub release are included in the package metadata

## ✨ Technical Requirements

1. **GitHub Actions Workflow:**
   ```yaml
   # Suggested workflow structure (to be implemented)
   name: Publish Package
   
   on:
     release:
       types: [created]
     push:
       tags:
         - 'v*'
   
   jobs:
     # Add publish jobs here
   ```

2. **Authentication:**
   - npm token stored as GitHub secret: `NPM_TOKEN`
   - GitHub token for GitHub Packages: `GITHUB_TOKEN` (automatically provided)

3. **Configuration Files:**
   - `.npmrc` must be configured to support both registries
   - `package.json` needs proper configuration for publishing to multiple registries

4. **Version Management:**
   - Extract version from Git tag
   - Update version in package.json if needed

## 🔮 Potential Challenges

1. **Authentication Complexity:**
   - Managing tokens securely across different registries
   - Ensuring proper scoping and permissions

2. **Version Consistency:**
   - Making sure the same version is published to both registries
   - Handling version conflicts if they arise

3. **Registry-Specific Requirements:**
   - Addressing different metadata requirements between npm and GitHub Package Registry
   - Managing dependencies correctly for both platforms

## 💎 Definition of Done

1. GitHub Actions workflow successfully publishes package to both registries
2. New versions can be published by creating a GitHub release or merging a tagged commit
3. Documentation updated to explain the release process for maintainers
4. Verified installations from both registries work as expected

## 📋 Notes

- Current manual release process involves running `npm publish` locally
- Ensure backward compatibility with existing workflows
- Consider future expansion to additional registries if needed
- May require updates to package.json and other configuration files

---

*Issue created by SailorScrum on behalf of the project team* 