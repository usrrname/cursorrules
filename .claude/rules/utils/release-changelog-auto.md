# This rule generates a comprehensive changelog

## Description
This rule generates a comprehensive changelog.md file by analyzing all git tags and commits, creating a chronological record of all project changes with proper semantic versioning structure. The changelog.md file is stored at the root of the project.

## Applicability
- **Files:** `changelog.md`
- **Always Apply:** false

## Rules
- Must validate that changelog can be generated before proceeding
- Must backup existing changelog.md if it exists
- Must check if existing changelog follows Keep a Changelog format
- Must call the existing changelog-generator-manual rule for actual generation
- Must preserve existing changelog content when possible
- Must provide clear feedback about changelog generation status

### release-changelog-auto

**Actions:**
  - type: generate
    content: |

    ## 📝 Changelog Generation Process
      
      I'll validate the environment and generate a comprehensive changelog for your release.
      
      1. **Validate Changelog Generation**:
         ```bash
         echo "🔄 Now generating comprehensive changelog..."
         
         # Backup existing changelog if it exists
         if [ -f "changelog.md" ]; then
           cp changelog.md changelog.md.backup
           echo "📋 Backed up existing changelog.md"
           
           # Check if existing changelog has proper structure
           if grep -q "## \[Unreleased\]" changelog.md; then
             echo "✅ Existing changelog has proper structure, will preserve content"
             PRESERVE_EXISTING=true
           else
             echo "⚠️ Existing changelog doesn't follow Keep a Changelog format"
             echo "Will create new changelog with existing content as reference"
             PRESERVE_EXISTING=false
           fi
         else
           echo "📝 No existing changelog.md found, creating new one"
           PRESERVE_EXISTING=false
         fi
         
         # Get all git tags sorted by version
         ALL_TAGS=$(git tag --sort=-version:refname)
         
         # Get commits since last tag (unreleased changes)
         UNRELEASED_COMMITS=$(git log --oneline --no-merges $(git describe --tags --abbrev=0 2>/dev/null || echo "")..HEAD)
         
         echo "📊 Changelog generation summary:"
         echo "  - Total git tags: $(echo "$ALL_TAGS" | wc -l | tr -d ' ')"
         echo "  - Unreleased commits: $(echo "$UNRELEASED_COMMITS" | wc -l | tr -d ' ')"
         echo "  - Preserve existing: $PRESERVE_EXISTING"
         ```
      
      2. **Call Changelog Generator**:
         ```bash
         # Call the existing changelog generator rule
         echo "🔄 Calling changelog generator..."
         
         # The changelog-generator-manual rule will handle the actual generation
         # This includes:
         # - Analyzing all git tags from the beginning of the repository
         # - Creating a chronological changelog with newest versions at the top
         # - Categorizing changes into Features, Bug Fixes, Breaking Changes, and Other
         # - Following Keep a Changelog format standards
         # - Including unreleased changes section for current development
         
         # After generation, verify the changelog was created successfully
         if [ -f "changelog.md" ]; then
           echo "✅ Changelog generated successfully at ./changelog.md"
           
           # Show a summary of what was generated
           echo "📋 Changelog summary:"
           echo "  - File size: $(wc -l < changelog.md) lines"
           echo "  - Unreleased section: $(grep -c "### 🚀 Added\|### 🐛 Fixed\|### 💥 Changed\|### 📚 Documentation" changelog.md || echo "0") categories"
           echo "  - Version entries: $(grep -c "^## \[v" changelog.md || echo "0") versions"
         else
           echo "❌ ERROR: Changelog generation failed"
           echo "Please check the changelog-generator-manual rule for details"
           exit 1
         fi
         ```

examples:
  - input: |
      User: "Create a release"
      Existing changelog: Yes, follows Keep a Changelog format
      Git tags: v2.0.0, v1.3.0, v1.2.0
      Unreleased commits: 5 commits
    output: |
      ## 📝 Changelog Generation Process
      
      🔄 Now generating comprehensive changelog...
      
      📋 Backed up existing changelog.md
      ✅ Existing changelog has proper structure, will preserve content
      
      📊 Changelog generation summary:
        - Total git tags: 3
        - Unreleased commits: 5
        - Preserve existing: true
      
      🔄 Calling changelog generator...
      ✅ Changelog generated successfully at ./changelog.md
      
      📋 Changelog summary:
        - File size: 45 lines
        - Unreleased section: 3 categories
        - Version entries: 3 versions

  - input: |
      User: "Create a release"
      Existing changelog: No
      Git tags: v1.0.0
      Unreleased commits: 2 commits
    output: |
      ## 📝 Changelog Generation Process
      
      🔄 Now generating comprehensive changelog...
      
      📝 No existing changelog.md found, creating new one
      
      📊 Changelog generation summary:
        - Total git tags: 1
        - Unreleased commits: 2
        - Preserve existing: false
      
      🔄 Calling changelog generator...
      ✅ Changelog generated successfully at ./changelog.md

tests:
  - input: "Create release with existing changelog"
    output: "Should backup existing changelog and call generator"
  
  - input: "Create release without existing changelog"
    output: "Should create new changelog using generator"
  
  - input: "Create release with malformed existing changelog"
    output: "Should detect format issues and create new changelog"
  
  - input: "Create release with no git tags"
    output: "Should handle case with no version history"

metadata:

## Additional Information
# Release Changelog Generation