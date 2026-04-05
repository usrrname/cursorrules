#!/bin/bash

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

DANGEROUS_PATTERNS=(
	"rm -rf /"
	"rm -rf /*"
	"rm -rf ~"
	"rm -rf \$HOME"
	"> /dev/sda"
	"dd if=/dev/zero"
	"mkfs."
	"fdisk /dev"
	"DROP TABLE"
	"drop table"
	"DELETE FROM.*WHERE.*="
	"TRUNCATE TABLE"
	"format C:"
	"del /f /s /q"
	"rd /s /q"
	":(){ :|:& };:"
	"chmod -R 777 /"
	"chown -R root /"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
	if echo "$COMMAND" | grep -qiE "$pattern"; then
		echo "🚨 SECURITY ALERT: Dangerous command pattern detected: '$pattern'" >&2
		echo "Command: $COMMAND" >&2
		echo "This command has been blocked for your safety." >&2
		exit 2
	fi
done

if echo "$COMMAND" | grep -qiE "git.*push.*--force|git.*push.*-f"; then
	echo "⚠️  WARNING: Force push detected. This can overwrite others' work." >&2
	echo "Command: $COMMAND" >&2
	echo "If you're sure, run this command manually." >&2
	exit 2
fi

if echo "$COMMAND" | grep -qiE "git.*reset.*--hard|git.*clean.*-fd"; then
	echo "⚠️  WARNING: Destructive git operation detected." >&2
	echo "Command: $COMMAND" >&2
	echo "This may delete uncommitted work. Run manually if you're sure." >&2
	exit 2
fi

exit 0
