# User Story: Automated Package Release Workflow

## ID: 0001
## Title: Automated NPM and GitHub Package Publishing on Release Creation
## Priority: High
## Story Points: 5
## Created: [Current Date]

## Description
**As a** package maintainer of @usrrname/cursor-rules,  
**I want** an automated workflow that publishes the package to both npm registry (@usrrname scope) and GitHub registry when a release is created,  
**So that** I can maintain consistent versioning across registries without manual publishing steps.

## Business Value
- Eliminates manual publishing steps, reducing human error
- Ensures version consistency between npm and GitHub packages
- Saves developer time and streamlines the release process
- Builds trust with users by maintaining synchronized package versions

## Requirements
1. When a GitHub release with a tag is created and merged to main, trigger an automated workflow
2. The workflow should extract version information from the GitHub release tag
3. Update the package.json version to match the release tag version
4. Publish the package to npm registry under the @usrrname scope
5. Publish the same version to GitHub Packages registry
6. Ensure both published packages have identical version numbers
7. Add appropriate error handling for failed publishing attempts
8. Include validation to prevent invalid versions from being published

## Acceptance Criteria
- [ ] GitHub workflow is triggered automatically when a new release is created
- [ ] The workflow correctly extracts the version from the release tag
- [ ] The package is successfully published to npm registry under @usrrname scope
- [ ] The same package version is successfully published to GitHub Packages
- [ ] The published package versions are identical in both registries
- [ ] The workflow fails gracefully if there are issues with the publishing process
- [ ] The workflow includes appropriate logging for debugging purposes
- [ ] Authentication to both registries is handled securely

## Technical Details
- Use GitHub Actions for the workflow implementation
- Utilize `actions/checkout@v4` for code checkout
- Use `actions/setup-node@v4` for Node.js setup
- Configure npm authentication using NODE_AUTH_TOKEN
- Use npm commands for version updating and publishing:
  ```
  npm version from-git --no-git-tag-version
  npm publish
  ```
- Configure the workflow to handle the two separate registries:
  - npm registry (https://registry.npmjs.org)
  - GitHub Packages registry (https://npm.pkg.github.com)
- Store npm token in GitHub Secrets (npm_token)
- Use GITHUB_TOKEN for GitHub Packages authentication
- Ensure that package.json repository field is correctly configured

## Dependencies
- Valid GitHub token with appropriate permissions for publishing
- Valid npm token with publish permissions to @usrrname scope
- Repository must be configured correctly in package.json
- Node.js and npm must be available in the GitHub Actions environment

## Testing Approach
1. Create a test release tag and verify workflow trigger
2. Check both registries to confirm correct version is published
3. Verify package contents match in both registries
4. Test error cases by simulating invalid version tags

## Notes
- Consider implementing semantic versioning validation to prevent invalid version formats
- GitHub Packages requires the repository field in package.json to match the GitHub repository
- Add workflow status badges to README.md for visibility
- Consider notification setup for successful/failed publishes 