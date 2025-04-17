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

🚧 Under construction 🚧

### MCP Setup

[About Model Context Protocol](https://github.com/modelcontextprotocol)


