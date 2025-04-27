# Technical Spike: Rendering Components within Markdown/MDX in Astro

[link-to-user-story](../story-1.story.md)
[link-to-arch](../architecture/astro-blog-architecture.md)

## Investigation Goals
- [ ] Learn Astro framework fundamentals
- [ ] Can standard markdown (`.md`) files in Astro import and render custom Astro/React/Vue/etc. components?
- [ ] Is MDX (`.mdx`) required for rendering components within markdown content in Astro?
- [ ] How is component usage syntax handled within markdown/MDX?
- [ ] How are component props passed from markdown/MDX?
- [ ] What are the setup requirements (dependencies, configuration) for this?

## Timeline
- Start Date: [YYYY-MM-DD] 
- End Date: [YYYY-MM-DD] 
- Time Box: ~2-3 hours (including setup)

## Environment Setup
1. **Project Initialization**
   ```bash
   # Create new Astro project for spike
   npm create astro@latest spike-markdown-components
   cd spike-markdown-components
   
   # Install required dependencies
   npm install @astrojs/mdx
   ```

2. **Configuration Requirements**
   - Update `astro.config.mjs`:
     ```js
     import { defineConfig } from 'astro/config';
     import mdx from '@astrojs/mdx';

     export default defineConfig({
       integrations: [mdx()],
     });
     ```
   - Configure content collections in `src/content/config.ts`:
     ```ts
     import { defineCollection, z } from 'astro:content';

     const spikeCollection = defineCollection({
       type: 'content',
       schema: z.object({
         title: z.string(),
         // Add other frontmatter fields as needed
       })
     });

     export const collections = {
       'spike': spikeCollection
     };
     ```

3. **Directory Structure Setup**
   ```
   src/
   ├── components/
   │   └── SpikeTestComponent.astro
   ├── content/
   │   └── spike/
   │       ├── md-test.md
   │       └── mdx-test.mdx
   ├── layouts/
   │   └── MarkdownPostLayout.astro
   └── pages/
       └── spike/
           └── [...slug].astro
   ```

4. **Verification Steps**
   - [ ] Astro dev server runs successfully
   - [ ] Content collections are properly configured
   - [ ] Basic markdown rendering works
   - [ ] MDX integration is properly installed

## Investigation Areas
1. **`.md` File Component Rendering**
   - Approach: Attempt to import and use a simple custom `.astro` component within a standard `.md` file.
   - Tools/Technologies: Astro, `.md` file, basic `.astro` component.
   - Success Criteria: Component renders correctly or Astro build provides clear error/guidance.

2. **`.mdx` File Component Rendering**
   - Approach: Install Astro MDX integration, attempt to import and use a simple custom `.astro` component within a `.mdx` file. Test passing props.
   - Tools/Technologies: Astro, `@astrojs/mdx` integration, `.mdx` file, basic `.astro` component.
   - Success Criteria: Component renders correctly with props within the `.mdx` file.

## Findings
### What Worked
- *[To be filled during investigation]*

### What Didn't Work
- *[To be filled during investigation]*

### Open Questions
- *[To be filled during investigation]*

## Recommendations
- *[To be filled after investigation]*

## Code Artifacts
- Repository: [Current Project]
- Branch: `spike/story-1-markdown-components`
- Key Files:
  - `src/content/spike/md-test.md`: Example standard markdown file
  - `src/content/spike/mdx-test.mdx`: Example MDX file
  - `src/components/SpikeTestComponent.astro`: Simple component for testing
  - `src/layouts/MarkdownPostLayout.astro`: Basic layout for markdown/MDX pages
  - `astro.config.mjs`: Astro configuration with MDX integration
  - `src/content/config.ts`: Content collections configuration

## Next Steps
- [ ] Complete environment setup
- [ ] Verify all dependencies and configurations
- [ ] Perform the investigation steps
- [ ] Document findings
- [ ] Make a recommendation based on findings

## Team Impact
- Frontend: Dictates how content creators can use interactive elements within posts
- Backend: Minimal impact, related to content structure
- Infrastructure: Requires MDX integration setup
- Testing: Requires testing component rendering within content

## Resources
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [MDX Documentation](https://mdxjs.com/docs/) 