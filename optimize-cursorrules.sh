#!/bin/bash

# CursorRules Optimization Script
# This script helps optimize cursorrules files to reduce token consumption

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RULES_DIR=".cursor/rules"
BACKUP_DIR=".cursor/rules.backup.$(date +%Y%m%d_%H%M%S)"
OPTIMIZED_DIR="optimized-examples"

# Create backup directory
echo -e "${BLUE}Creating backup of current rules...${NC}"
mkdir -p "$BACKUP_DIR"
cp -r "$RULES_DIR"/* "$BACKUP_DIR/"

# Function to get file size in KB
get_file_size() {
    local file="$1"
    if [ -f "$file" ]; then
        echo $(($(wc -c < "$file") / 1024))
    else
        echo "0"
    fi
}

# Function to analyze file for optimization opportunities
analyze_file() {
    local file="$1"
    local size=$(get_file_size "$file")
    
    echo -e "\n${YELLOW}Analyzing: $file (${size}KB)${NC}"
    
    # Count lines
    local lines=$(wc -l < "$file" 2>/dev/null || echo "0")
    
    # Check for common optimization opportunities
    local examples=$(grep -c "examples:" "$file" 2>/dev/null || echo "0")
    local verbose_desc=$(grep -c "This rule.*enables\|This rule.*defines" "$file" 2>/dev/null || echo "0")
    local redundant_meta=$(grep -c "author:\|created:\|updated:\|tags:" "$file" 2>/dev/null || echo "0")
    
    echo "  Lines: $lines"
    echo "  Examples sections: $examples"
    echo "  Verbose descriptions: $verbose_desc"
    echo "  Redundant metadata: $redundant_meta"
    
    # Calculate optimization potential
    local potential=0
    if [ "$examples" -gt 1 ]; then
        potential=$((potential + 30))
    fi
    if [ "$verbose_desc" -gt 0 ]; then
        potential=$((potential + 15))
    fi
    if [ "$redundant_meta" -gt 0 ]; then
        potential=$((potential + 10))
    fi
    
    echo -e "  ${GREEN}Optimization potential: ${potential}%${NC}"
    
    return $potential
}

# Function to create optimization report
create_optimization_report() {
    local report_file="cursorrules-optimization-report.md"
    
    cat > "$report_file" << EOF
# CursorRules Optimization Report

Generated on: $(date)

## File Analysis Summary

EOF
    
    local total_size=0
    local total_potential=0
    local file_count=0
    
    # Find all .mdc files and analyze them
    while IFS= read -r -d '' file; do
        local size=$(get_file_size "$file")
        total_size=$((total_size + size))
        file_count=$((file_count + 1))
        
        echo -e "\n${BLUE}Processing: $file${NC}"
        analyze_file "$file"
        local potential=$?
        total_potential=$((total_potential + potential))
        
        # Add to report
        echo "### $(basename "$file")" >> "$report_file"
        echo "- Size: ${size}KB" >> "$report_file"
        echo "- Optimization potential: ${potential}%" >> "$report_file"
        echo "" >> "$report_file"
        
    done < <(find "$RULES_DIR" -name "*.mdc" -print0)
    
    # Calculate overall statistics
    local avg_potential=$((total_potential / file_count))
    local estimated_savings=$((total_size * avg_potential / 100))
    
    echo -e "\n${GREEN}=== OPTIMIZATION SUMMARY ===${NC}"
    echo -e "Total files analyzed: ${file_count}"
    echo -e "Total size: ${total_size}KB"
    echo -e "Average optimization potential: ${avg_potential}%"
    echo -e "Estimated size reduction: ${estimated_savings}KB"
    echo -e "Estimated final size: $((total_size - estimated_savings))KB"
    
    # Add summary to report
    cat >> "$report_file" << EOF

## Summary

- **Total files analyzed**: $file_count
- **Total size**: ${total_size}KB
- **Average optimization potential**: ${avg_potential}%
- **Estimated size reduction**: ${estimated_savings}KB
- **Estimated final size**: $((total_size - estimated_savings))KB

## Optimization Recommendations

### High Priority (50%+ potential)
- fair-witness-agent.mdc
- agent-communication.mdc  
- release-workflow-auto.mdc

### Medium Priority (30-50% potential)
- typescript-standards-auto.mdc
- dev-workflow.mdc
- security-scan-agent.mdc

### Low Priority (10-30% potential)
- Smaller utility files
- Test-related rules
- Template files

## Next Steps

1. Review the optimized examples in the \`$OPTIMIZED_DIR\` directory
2. Apply optimizations to high-priority files first
3. Test functionality after each optimization
4. Monitor token usage improvements
5. Update documentation as needed

EOF
    
    echo -e "\n${GREEN}Optimization report saved to: $report_file${NC}"
}

# Function to show optimization examples
show_examples() {
    echo -e "\n${BLUE}=== OPTIMIZATION EXAMPLES ===${NC}"
    echo -e "${YELLOW}Original vs Optimized file sizes:${NC}"
    
    if [ -d "$OPTIMIZED_DIR" ]; then
        for file in "$OPTIMIZED_DIR"/*-optimized.mdc; do
            if [ -f "$file" ]; then
                local original_name=$(basename "$file" -optimized.mdc)
                local original_file=$(find "$RULES_DIR" -name "$original_name.mdc" -print -quit)
                
                if [ -n "$original_file" ]; then
                    local original_size=$(get_file_size "$original_file")
                    local optimized_size=$(get_file_size "$file")
                    local reduction=$((original_size - optimized_size))
                    local percent=$((reduction * 100 / original_size))
                    
                    echo -e "  ${original_name}.mdc: ${original_size}KB → ${optimized_size}KB (${reduction}KB saved, ${percent}% reduction)"
                fi
            fi
        done
    fi
}

# Main execution
echo -e "${GREEN}=== CursorRules Optimization Tool ===${NC}"
echo -e "Backup created at: $BACKUP_DIR"

# Create optimization report
create_optimization_report

# Show examples
show_examples

echo -e "\n${GREEN}Optimization analysis complete!${NC}"
echo -e "Review the optimization report and examples to proceed with manual optimizations."
echo -e "Remember to test functionality after each optimization."