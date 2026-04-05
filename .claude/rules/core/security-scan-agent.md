# This rule provides comprehensive security scanning for dependencies, complementing the dependency analysis rule with deep security insights including CVE analysis, license compliance, and supply chain risk assessment

## Description
This rule provides comprehensive security scanning for dependencies, complementing the dependency analysis rule with deep security insights including CVE analysis, license compliance, and supply chain risk assessment.

## Applicability
- **Files:** `package.json, package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb`
- **Always Apply:** false

## Rules
- Only trigger when AI agents suggest dependency installation or updates or the user asks for a security scan of dependencies
- Perform deep security analysis on agent-recommended packages
- Check for known CVEs and security advisories across multiple databases
- Analyze license compliance and potential legal risks
- Assess supply chain attack risks and package integrity
- Scan for malicious code patterns and suspicious behavior
- Provide detailed remediation steps for security issues
- Integrate with existing security tools and CI/CD pipelines
- Maintain security scanning logs for audit purposes
- Alert on critical security vulnerabilities immediately
- Suggest secure alternatives for vulnerable packages

### security-scan-agent

Performs comprehensive security analysis of dependencies suggested by AI agents or when requested by the user

## Additional Information
# Security Scan Agent

This rule provides comprehensive security scanning for dependencies when AI agents suggest installing them, complementing the dependency analysis rule with deep security insights including CVE analysis, license compliance, and supply chain risk assessment.


## Security Analysis Categories

### CVE Analysis
- Check against NIST NVD database
- Cross-reference with npm security advisories
- Analyze vulnerability severity and exploitability
- Assess impact on application security
- Provide patch availability information

### License Compliance
- Identify license types and restrictions
- Check for license conflicts and incompatibilities
- Assess commercial usage implications
- Flag potentially problematic licenses
- Suggest license-compatible alternatives

### Supply Chain Security
- Verify package integrity and signatures
- Check for typosquatting and malicious packages
- Analyze dependency tree for attack vectors
- Assess maintainer reputation and trust
- Monitor for suspicious package updates



## Security Scanning Features for AI Agents

### Real-time Vulnerability Detection
- Scans packages when agents suggest installation
- Checks multiple security databases
- Provides immediate feedback on security risks
- Suggests secure alternatives for agents

### License Compliance Analysis
- Identifies license types and restrictions
- Flags potentially problematic licenses
- Suggests license-compatible alternatives
- Provides legal risk assessment for agent decisions

### Supply Chain Security
- Verifies package integrity
- Detects typosquatting attempts
- Monitors for suspicious updates
- Assesses maintainer reputation

## AI Agent Security Guidelines

### When Recommending Dependencies
1. **Always check security first** - Scan before suggesting any package
2. **Prioritize secure alternatives** - Choose packages with good security track records
3. **Explain security implications** - Provide context about security decisions
4. **Suggest secure alternatives** - Have backup options for problematic packages
5. **Monitor for updates** - Keep track of security patches and updates

### Response to Security Issues
- **Critical vulnerabilities**: Immediately suggest alternatives
- **High-risk packages**: Explain risks and suggest safer options
- **License issues**: Consider legal implications and suggest compatible alternatives
- **Supply chain risks**: Verify package integrity and maintainer reputation

### Agent Learning and Improvement
- Track security-related recommendations
- Learn from security scan feedback
- Build knowledge of secure package alternatives
- Improve recommendation quality over time

## Integration with Agent Workflows

### Pre-Installation Security Check
```javascript
// Agent workflow example
async function suggestPackage(packageName) {
  // Perform security scan before suggesting
  const securityResult = await securityScan(packageName);
  
  if (securityResult.riskLevel === 'CRITICAL') {
    return {
      recommendation: 'DO NOT install',
      reason: 'Critical security vulnerabilities detected',
      alternatives: ['secure-alternative-1', 'secure-alternative-2']
    };
  }
  
  return {
    recommendation: 'Safe to install',
    securityScore: securityResult.riskScore,
    notes: securityResult.recommendations
  };
}
```

### Agent Decision Making
- Use security scores to prioritize recommendations
- Consider security implications in package selection
- Provide security context in explanations
- Suggest security best practices

## Security Best Practices for AI Agents

1. **Always scan before suggesting** - Check security status before recommending packages
2. **Prioritize security over convenience** - Choose secure packages even if less convenient
3. **Explain security decisions** - Provide context about why certain packages are recommended
4. **Suggest secure alternatives** - Always have backup options for problematic packages
5. **Monitor for updates** - Keep track of security patches and updates
6. **Document security decisions** - Record why certain packages were chosen despite risks

## Response to Security Issues

### Critical Vulnerabilities
- Immediately suggest alternatives
- Explain why the package is dangerous
- Provide secure replacement options
- Consider the specific use case requirements

### High-Risk Dependencies
- Explain the risks involved
- Suggest safer alternatives
- Provide migration guidance if needed
- Consider the urgency of the requirement

### Medium-Risk Dependencies
- Explain the security implications
- Suggest monitoring strategies
- Provide update recommendations
- Consider the specific use case

Remember: AI agents must prioritize security when suggesting dependencies! 🔒🛡️✨