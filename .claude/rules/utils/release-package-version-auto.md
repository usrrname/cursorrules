# This rule checks the current version in package

## Description
This rule checks the current version in package.json and offers to update it to a new version. It also offers to commit the version change and push the commit. It runs when users request release creation, version bumping, or package publishing.

## Applicability
- **Files:** `package.json,*-lock.json,*.lock`
- **Always Apply:** false

## Rules
- Must offer to update package.json version automatically
- Must calculate new version based on semantic versioning
- Must handle custom version inputs
- Must offer to commit version changes
- Must offer to push version commits
- Must provide clear feedback about version update status

### release-package-version-auto

**Actions:**
  - type: generate
    content: |

    ## 🔄 Package Version Management Process
      
      I'll help you update the version in package.json and manage the version commit.
      
      1. **Offer Version Bump Update**:
         ```bash
         echo ""
         echo "🔄 Would you like me to automatically update the version in package.json?"
         echo "Current version: $CURRENT_VERSION"
         
         # Calculate new version based on user choice
         if [ "$VERSION_BUMP" == "major" ]; then
           NEW_VERSION=$(echo $CURRENT_VERSION | awk -F. '{print $1+1 ".0.0"}')
         elif [ "$VERSION_BUMP" == "minor" ]; then
           NEW_VERSION=$(echo $CURRENT_VERSION | awk -F. '{print $1 "." $2+1 ".0"}')
         elif [ "$VERSION_BUMP" == "patch" ]; then
           NEW_VERSION=$(echo $CURRENT_VERSION | awk -F. '{print $1 "." $2 "." $3+1}')
         elif [ "$VERSION_BUMP" == "custom" ]; then
           NEW_VERSION="$CUSTOM_VERSION"
         fi
         
         echo "New version would be: $NEW_VERSION"
         read -p "Update package.json version? (y/N): " UPDATE_VERSION
         
         if [[ "$UPDATE_VERSION" =~ ^[Yy]$ ]]; then
           echo "🔄 Updating package.json version..."
           
           # Update package.json version using npm
           if [ "$VERSION_BUMP" == "custom" ]; then
             # For custom version, we need to manually update
             node -e "
               const fs = require('fs');
               const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
               pkg.version = '$NEW_VERSION';
               fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
               console.log('✅ Updated package.json version to $NEW_VERSION');
             "
           else
             # Use npm version for standard bumps
             npm version $VERSION_BUMP --no-git-tag
             echo "✅ Updated package.json version to $NEW_VERSION"
           fi
           
           # Offer to commit the version change
           echo ""
           echo "🔄 Would you like me to commit the version change?"
           read -p "Commit version bump? (y/N): " COMMIT_VERSION
           
           if [[ "$COMMIT_VERSION" =~ ^[Yy]$ ]]; then
             echo "🔄 Committing version change..."
             git add package.json
             git commit -m "chore: bump version to $NEW_VERSION"
             echo "✅ Version change committed successfully"
             
             # Offer to push the commit
             echo ""
             echo "🔄 Would you like me to push the version commit?"
             read -p "Push version commit? (y/N): " PUSH_VERSION
             
             if [[ "$PUSH_VERSION" =~ ^[Yy]$ ]]; then
               echo "🔄 Pushing version commit..."
               git push origin $CURRENT_BRANCH
               echo "✅ Version commit pushed successfully"
             fi
           fi
         else
           echo "⏭️ Skipping version update"
         fi
         ```

examples:
  - input: |
      User: "Create a release"
      Current version: 1.2.3
      Version bump: minor
      User confirms version update and commit
    output: |
      ## 🔄 Package Version Management Process
      
      🔄 Would you like me to automatically update the version in package.json?
      Current version: 1.2.3
      New version would be: 1.3.0
      Update package.json version? (y/N): y
      🔄 Updating package.json version...
      ✅ Updated package.json version to 1.3.0
      
      🔄 Would you like me to commit the version change?
      Commit version bump? (y/N): y
      🔄 Committing version change...
      ✅ Version change committed successfully
      
      🔄 Would you like me to push the version commit?
      Push version commit? (y/N): y
      🔄 Pushing version commit...
      ✅ Version commit pushed successfully

  - input: |
      User: "Create a release"
      Current version: 1.2.3
      Version bump: custom (2.0.0)
      User confirms version update but skips commit
    output: |
      ## 🔄 Package Version Management Process
      
      🔄 Would you like me to automatically update the version in package.json?
      Current version: 1.2.3
      New version would be: 2.0.0
      Update package.json version? (y/N): y
      🔄 Updating package.json version...
      ✅ Updated package.json version to 2.0.0
      
      🔄 Would you like me to commit the version change?
      Commit version bump? (y/N): n
      ⏭️ Skipping version update

tests:
  - input: "Create release with major version bump"
    output: "Should calculate major version and update package.json"
  
  - input: "Create release with minor version bump"
    output: "Should calculate minor version and update package.json"
  
  - input: "Create release with patch version bump"
    output: "Should calculate patch version and update package.json"
  
  - input: "Create release with custom version"
    output: "Should use custom version and update package.json"
  
  - input: "Create release but skip version update"
    output: "Should skip version update and continue"

metadata:

## Additional Information
# Release Package Version Management