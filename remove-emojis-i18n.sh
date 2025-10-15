#!/bin/bash

# Script to remove emojis from i18n pages.json files
I18N_DIR="./src/i18n/locales"

# Files to process
FILES=(
  "en/pages.json"
  "es/pages.json"
  "nl/pages.json"
)

# Common emoji patterns to remove
EMOJI_PATTERNS=(
  "🚀 "
  "🎯"
  "🔄"
  "✓"
  "👤"
  "🎥 "
  "⚠️ "
  "💼 "
  "🔔 "
  "✅ "
  "✨ "
)

# Specific replacements for icon fields (remove the entire icon field value but keep the field)
declare -A ICON_REPLACEMENTS=(
  ['"🎯"']='""'
  ['"🔄"']='""'
  ['"✓"']='""'
  ['"👤"']='""'
)

echo "Starting emoji removal from i18n pages.json files..."

for file in "${FILES[@]}"; do
  filepath="$I18N_DIR/$file"

  if [ ! -f "$filepath" ]; then
    echo "File not found: $filepath"
    continue
  fi

  echo "Processing: $file"

  # First remove simple emoji patterns (emojis followed by space or at end of strings)
  for emoji in "${EMOJI_PATTERNS[@]}"; do
    # Escape special regex characters for sed
    escaped_emoji=$(printf '%s\n' "$emoji" | sed 's/[\/&]/\\&/g')
    sed -i '' "s/$escaped_emoji//g" "$filepath"
  done

  # Replace icon field values with empty strings
  for pattern in "${!ICON_REPLACEMENTS[@]}"; do
    replacement="${ICON_REPLACEMENTS[$pattern]}"
    escaped_pattern=$(printf '%s\n' "$pattern" | sed 's/[\/&]/\\&/g')
    escaped_replacement=$(printf '%s\n' "$replacement" | sed 's/[\/&]/\\&/g')
    sed -i '' "s/$escaped_pattern/$escaped_replacement/g" "$filepath"
  done

  echo "Completed: $file"
done

echo ""
echo "All i18n files processed!"
echo "Files updated:"
for file in "${FILES[@]}"; do
  echo "  - $file"
done
