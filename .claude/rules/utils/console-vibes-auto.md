# adds fun emojis to console logs

## Description
adds fun emojis to console logs

## Applicability
- **Files:** `**/*.{js,ts,jsx,tsx,mjs}`
- **Always Apply:** true

### console-vibes

Adds vibes to console.log statements

## Additional Information
# Console log emojis

This rule adds fun emojis to console logs, making debugging a more joyful experience!



## Usage

This rule will automatically add contextually appropriate emojis to your console logs:

- Success/completion messages get 🎉 or ✨
- Start/initialization messages get 🚀
- Loading messages get ⚡️
- Configuration related messages get ⚙️
- User-related messages get 👤
- Data-related messages get 📊
- Default messages get 🌈
- Error messages get ❌

The rule is smart enough to:
1. Preserve existing string quotes
2. Choose appropriate emojis based on message content
3. Work with log, info, error, and debug statements
4. Maintain code formatting

## Key Principles

- Makes logs more visually distinguishable
- Make debugging and troubleshooting more fun and less demoraliziing
- Make log scanning more intuitive with visual cues