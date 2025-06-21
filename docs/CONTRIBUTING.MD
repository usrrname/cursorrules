# Contributing

I have no idea who might be interested in this project, but thanks for your interest!

## 🧪 Local Development

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- latest version of Cursor IDE

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
   # should return http://localhost:4873/
   ```

4. Build and publish:
   ```bash
   npm publish --scope=@usrrname
   ```

5. Test the command locally:
   ```bash
   ## as a tarball
   npm pack
   ## as a folder
   npx cursorrules
   ```

6. Clean up test versions:
   ```bash
   npm unpublish @usrrname:registry http://localhost:4873/ @usrrname/cursorrules
   ```

# Automated Release

Automated release can be done in 2 ways:

1. Creating a new release in the [Releases](https://github.com/usrrname/cursorrules/releases) page with the new version number as tag
- If you have no ideas for release notes, you can tell Cursor to create them for you and it will use the `release-notes-generator-manual.mdc` rule. Copy that into the Release Notes section.
- Once the release is public, the publishing Github Actions workflow will be triggered.

2. Activate the `release-workflow-auto.mdc` rule in Cursor by asking it to create or prepare a release.
- This rule will create a new release with a version bump, generate release notes and changelog, and update the version in package.json.
- It will create a new branch and tag, and push the changes to the remote repository.
- On merge to main, the publishing Github Actions workflow will be triggered.