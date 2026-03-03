---
name: dependency-analysis
description: This rule automatically analyzes dependencies before they're installed to provide insights about maintenance frequency, security vulnerabilities, and popularity in the developer ecosystem.
---

# Dependency Analysis

## Critical Rules

- Before a dependency is installed (npm install, yarn add, pnpm add), automatically analyze the package using socket.io to get the package information from the npm registry and GitHub.
- Check maintenance frequency by examining last release date, commit activity, and issue response times
- Scan for known security vulnerabilities using npm audit and security databases
- Assess popularity through download counts, GitHub stars, and community adoption
- Provide actionable recommendations for dependency selection in a clear, actionable format with severity levels

## Analysis Categories

### Maintenance Frequency
- Last release date and frequency
- Recent commit activity (last 30, 90, 365 days)
- Issue response times and resolution rates
- Pull request merge frequency
- Maintainer activity and responsiveness

### Security Vulnerabilities
- Known CVEs and security advisories
- Dependency tree vulnerabilities
- Outdated dependencies with security patches
- License compliance issues
- Supply chain attack risks

### Popularity & Ecosystem Health
- Weekly/monthly download counts
- GitHub stars, forks, and watchers
- Community adoption and usage trends
- Documentation quality and completeness
- TypeScript support and type definitions
- Bundle size impact and performance considerations

<rule>
name: dependency-analysis
description: Analyzes dependencies for maintenance, security, and popularity metrics
version: 1.0
severity: suggestion

filters:
  - type: event
    pattern: "file_modified|file_created"
  - type: user_input
    pattern: "analyze dependencies|npm install|yarn add|pnpm add"
  - type: file_extension
    pattern: "\\.(json|lock)$"
  - type: content
    pattern: "(dependencies|devDependencies|peerDependencies)"

matches: |
  // Match package.json modifications and lock file changes
  package.json
  package-lock.json
  yarn.lock
  pnpm-lock.yaml

transforms: |
  // Analyze dependencies when package files are modified
  {{
    const analyzeDependency = async (packageName, version) => {
      try {
        // Fetch package information from npm registry
        const npmResponse = await fetch(`https://registry.npmjs.org/${packageName}`);
        const npmData = await npmResponse.json();
        
        // Fetch GitHub data if repository is available
        let githubData = null;
        if (npmData.repository && npmData.repository.url) {
          const repoUrl = npmData.repository.url.replace('git+', '').replace('.git', '');
          const repoPath = repoUrl.split('github.com/')[1];
          if (repoPath) {
            const githubResponse = await fetch(`https://api.github.com/repos/${repoPath}`);
            githubData = await githubResponse.json();
          }
        }
        
        // Check for security vulnerabilities
        const auditResponse = await fetch(`https://registry.npmjs.org/-/npm/v1/security/advisories/${packageName}`);
        const auditData = await auditResponse.json();
        
        // Calculate maintenance score
        const lastRelease = new Date(npmData.time[npmData['dist-tags'].latest]);
        const daysSinceRelease = Math.floor((Date.now() - lastRelease.getTime()) / (1000 * 60 * 60 * 24));
        
        let maintenanceScore = 100;
        if (daysSinceRelease > 365) maintenanceScore -= 40;
        else if (daysSinceRelease > 180) maintenanceScore -= 20;
        else if (daysSinceRelease > 90) maintenanceScore -= 10;
        
        // Calculate popularity score
        const weeklyDownloads = npmData.downloads?.weekly || 0;
        let popularityScore = 100;
        if (weeklyDownloads < 1000) popularityScore -= 50;
        else if (weeklyDownloads < 10000) popularityScore -= 20;
        else if (weeklyDownloads > 100000) popularityScore += 20;
        
        // Calculate security score
        const vulnerabilities = auditData.vulnerabilities || [];
        let securityScore = 100 - (vulnerabilities.length * 20);
        
        return {
          packageName,
          version,
          maintenanceScore,
          popularityScore,
          securityScore,
          lastRelease: daysSinceRelease,
          weeklyDownloads,
          vulnerabilities: vulnerabilities.length,
          githubStars: githubData?.stargazers_count || 0,
          recommendations: generateRecommendations(maintenanceScore, popularityScore, securityScore, vulnerabilities)
        };
      } catch (error) {
        console.error(`Error analyzing ${packageName}:`, error);
        return null;
      }
    };
    
    const generateRecommendations = (maintenance, popularity, security, vulnerabilities) => {
      const recommendations = [];
      
      if (maintenance < 60) {
        recommendations.push("⚠️ Low maintenance activity - consider alternatives");
      }
      if (popularity < 50) {
        recommendations.push("📉 Low popularity - may have limited community support");
      }
      if (security < 80) {
        recommendations.push("🔒 Security vulnerabilities detected - update or replace");
      }
      if (vulnerabilities.length > 0) {
        recommendations.push(`🚨 ${vulnerabilities.length} security vulnerability(ies) found`);
      }
      
      return recommendations;
    };
    
    // Analyze all dependencies in package.json
    const packageJson = JSON.parse(content);
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies
    };
    
    const analysisResults = [];
    for (const [name, version] of Object.entries(allDeps)) {
      const result = await analyzeDependency(name, version);
      if (result) {
        analysisResults.push(result);
      }
    }
    
    return {
      analysis: analysisResults,
      summary: generateSummary(analysisResults)
    };
  }}

examples:
  - input: |
      {
        "dependencies": {
          "lodash": "^4.17.21",
          "express": "^4.18.2"
        }
      }
    output: |
      ## Dependency Analysis Results ✨
      
      ### lodash@^4.17.21
      - 🟢 Maintenance Score: 95/100 (Last release: 45 days ago)
      - 🟢 Popularity Score: 120/100 (2.5M weekly downloads)
      - 🟢 Security Score: 100/100 (No vulnerabilities)
      - ⭐ GitHub Stars: 58.2k
      - ✅ Recommendations: Excellent choice! Well-maintained and secure.
      
      ### express@^4.18.2
      - 🟢 Maintenance Score: 90/100 (Last release: 30 days ago)
      - 🟢 Popularity Score: 110/100 (1.8M weekly downloads)
      - 🟡 Security Score: 85/100 (1 minor vulnerability)
      - ⭐ GitHub Stars: 62.1k
      - ⚠️ Recommendations: Consider updating to latest version for security patch.
  
  - input: |
      {
        "dependencies": {
          "deprecated-package": "^1.0.0"
        }
      }
    output: |
      ## Dependency Analysis Results ⚠️
      
      ### deprecated-package@^1.0.0
      - 🔴 Maintenance Score: 20/100 (Last release: 500 days ago)
      - 🔴 Popularity Score: 30/100 (50 weekly downloads)
      - 🟡 Security Score: 60/100 (2 vulnerabilities)
      - ⭐ GitHub Stars: 12
      - 🚨 Recommendations: 
        - Package is deprecated and poorly maintained
        - Consider alternatives: modern-alternative, better-package
        - Security vulnerabilities detected - immediate action required

tests:
  - input: "npm install express"
    output: "Analyzing express... ✅ Express is well-maintained with 1.8M weekly downloads. No security issues detected."
  
  - input: "yarn add vulnerable-package"
    output: "🚨 WARNING: vulnerable-package has 3 security vulnerabilities! Consider alternatives or update immediately."
  
  - input: "pnpm add abandoned-lib"
    output: "⚠️ CAUTION: abandoned-lib hasn't been updated in 2 years. Low community support. Consider alternatives."

metadata:
  priority: high
  version: 1.0
</rule>

## Usage Examples

### When Installing a New Dependency

```bash
npm install some-package
```

**Analysis Output:**
```
🔍 Analyzing some-package...

📊 Package Analysis Results:
✅ Maintenance: Excellent (Last release: 15 days ago)
✅ Popularity: High (500k weekly downloads)
✅ Security: Clean (No vulnerabilities)
⭐ GitHub: 2.3k stars

💡 Recommendation: Great choice! This package is well-maintained and secure.
```

### When Installing a Problematic Dependency

```bash
npm install old-vulnerable-package
```

**Analysis Output:**
```
🚨 WARNING: old-vulnerable-package Analysis

❌ Maintenance: Poor (Last release: 400 days ago)
❌ Popularity: Low (100 weekly downloads)
❌ Security: Critical (5 vulnerabilities detected)
⭐ GitHub: 50 stars

⚠️ Recommendations:
- Package is poorly maintained and has security issues
- Consider alternatives: modern-alternative, secure-package
- If you must use this package, update to latest version
- Monitor for security patches
```

### Batch Analysis for Existing Dependencies

```bash
# Analyze all current dependencies
npm audit
```

**Enhanced Output:**
```
🔍 Dependency Health Check

📦 Total Dependencies: 45
✅ Well-maintained: 38 packages
⚠️ Needs attention: 5 packages
🚨 Critical issues: 2 packages

📊 Summary:
- Average maintenance score: 85/100
- Average popularity score: 78/100
- Security vulnerabilities: 3 found

💡 Action Items:
1. Update lodash to fix security vulnerability
2. Replace deprecated-package with modern-alternative
3. Monitor old-package for updates
```

## Integration with Package Managers

### npm
- Hooks into `npm install` and `npm audit`
- Provides real-time analysis during installation
- Integrates with `npm outdated` for update recommendations

### yarn
- Works with `yarn add` and `yarn audit`
- Analyzes dependencies in yarn.lock
- Provides yarn-specific recommendations

### pnpm
- Compatible with `pnpm add` and `pnpm audit`
- Analyzes pnpm-lock.yaml
- Respects pnpm's dependency resolution

### bun
- Compatible with `bun add` and `bun audit`
- Analyzes bun.lockb
- Respects bun's dependency resolution

## Configuration Options

### Analysis Depth
- **Quick**: Basic maintenance and security check (default)
- **Detailed**: Full analysis including GitHub metrics and community health
- **Comprehensive**: Deep dive with alternative suggestions and migration paths

### Notification Levels
- **Info**: All analysis results
- **Warning**: Only problematic dependencies
- **Critical**: Only security vulnerabilities and maintenance issues

### Cache Settings
- Cache analysis results for 24 hours (default)
- Configurable cache duration
- Force refresh option for critical security updates

## Best Practices

1. **Always check maintenance frequency** before adding new dependencies
2. **Prioritize security** over convenience when choosing packages
3. **Consider alternatives** for deprecated or poorly maintained packages
4. **Regular audits** of existing dependencies
5. **Monitor for updates** and security patches
6. **Document decisions** when using potentially problematic packages

## Security Considerations

- Respect API rate limits when querying external services
- Cache sensitive information securely
- Provide clear warnings for security vulnerabilities
- Suggest secure alternatives when available
- Integrate with existing security scanning tools
