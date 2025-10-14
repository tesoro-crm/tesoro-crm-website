#!/bin/bash

# Script to remove emojis from knowledge base JSON files
KB_DIR="./src/content/knowledge-base"

# Array of files to process (excluding the already-done basic-contact-management-tutorial.json and account-registration-complete-guide.json)
FILES=(
  "add-contact.json"
  "ai-property-matching-advanced.json"
  "client-portal-setup-guide.json"
  "deal-pipeline-complete-guide.json"
  "property-management-tutorial.json"
  "system-architecture-overview.json"
  "why-enterprise-choose-tesoro.json"
)

# Emoji patterns to remove
EMOJI_PATTERNS=(
  "📋 "
  "🎥 "
  "➕ "
  "🛡️ "
  "✏️ "
  "🏷️ "
  "🚀 "
  "👥"
  "✅ "
  "💡 "
  "⚠️ "
  "🔍 "
  "📝 "
  "🎯"
  "🎉 "
  "🔧 "
  "⏱️ "
  "❌ "
  "🔒 "
  "📊 "
  "⭐ "
  "🌟 "
  "💼 "
  "🏠 "
  "📱 "
  "💬 "
  "🎨 "
  "⚡ "
)

# Text patterns to replace (with Tip: instead of emoji Tip:)
declare -A TEXT_REPLACEMENTS=(
  ["<strong>💡 Tip:</strong>"]="<strong>Tip:</strong>"
  ["<strong>💡 Pro Tip:</strong>"]="<strong>Tip:</strong>"
  ["<strong>⚠️ Let op:</strong>"]="<strong>Let op:</strong>"
  ["<strong>⚠️ Note:</strong>"]="<strong>Note:</strong>"
  ["<strong>⚠️ Nota:</strong>"]="<strong>Nota:</strong>"
  ["<strong>🔍 Verificatie:</strong>"]="<strong>Verificatie:</strong>"
  ["<strong>🔍 Verification:</strong>"]="<strong>Verification:</strong>"
  ["<strong>🔍 Verificación:</strong>"]="<strong>Verificación:</strong>"
  ["<strong>📝 Aanbevolen tag categorieën:</strong>"]="<strong>Aanbevolen tag categorieën:</strong>"
  ["<strong>📝 Recommended tag categories:</strong>"]="<strong>Recommended tag categories:</strong>"
  ["<strong>📝 Categorías de tags recomendadas:</strong>"]="<strong>Categorías de tags recomendadas:</strong>"
  ["het potlood icoon (✏️) dat verschijnt"]="het potlood icoon dat verschijnt"
  ["the pencil icon (✏️) that appears"]="the pencil icon that appears"
  ["el ícono de lápiz (✏️) que aparece"]="el ícono de lápiz que aparece"
  ["<strong>⚠️ Let op bij wijzigen:</strong>"]="<strong>Let op bij wijzigen:</strong>"
  ["<strong>⚠️ Be careful when changing:</strong>"]="<strong>Be careful when changing:</strong>"
  ["<strong>⚠️ Ten cuidado al cambiar:</strong>"]="<strong>Ten cuidado al cambiar:</strong>"
  ["<strong>💡 Consejo Pro:</strong>"]="<strong>Consejo:</strong>"
  ['"icon": "🎯"']=''
  ['"icon": "👥"']=''
)

# Function to remove icon lines (they cause trailing comma issues)
remove_icon_lines() {
  local file=$1
  # Remove entire icon line
  sed -i '' '/^[[:space:]]*"icon":[[:space:]]*"[^"]*"[,]*$/d' "$file"
}

# Function to fix trailing commas after icon removal
fix_trailing_commas() {
  local file=$1
  # Fix },, to }
  sed -i '' 's/},[[:space:]]*,/},/g' "$file"
  # Fix trailing comma before closing brace
  sed -i '' 's/,[[:space:]]*\}/}/g' "$file"
}

echo "Starting emoji removal from knowledge base files..."

for file in "${FILES[@]}"; do
  filepath="$KB_DIR/$file"

  if [ ! -f "$filepath" ]; then
    echo "⚠️  File not found: $filepath"
    continue
  fi

  echo "Processing: $file"

  # First remove simple emoji patterns
  for emoji in "${EMOJI_PATTERNS[@]}"; do
    # Escape special characters for sed
    escaped_emoji=$(printf '%s\n' "$emoji" | sed 's/[\/&]/\\&/g')
    sed -i '' "s/$escaped_emoji//g" "$filepath"
  done

  # Then replace text patterns
  for pattern in "${!TEXT_REPLACEMENTS[@]}"; do
    replacement="${TEXT_REPLACEMENTS[$pattern]}"
    # Escape special characters
    escaped_pattern=$(printf '%s\n' "$pattern" | sed 's/[\/&]/\\&/g')
    escaped_replacement=$(printf '%s\n' "$replacement" | sed 's/[\/&]/\\&/g')
    sed -i '' "s/$escaped_pattern/$escaped_replacement/g" "$filepath"
  done

  # Remove icon lines
  remove_icon_lines "$filepath"

  # Fix any trailing comma issues
  fix_trailing_commas "$filepath"

  echo "✓ Completed: $file"
done

echo ""
echo "✓ All files processed!"
echo "Files updated:"
for file in "${FILES[@]}"; do
  echo "  - $file"
done
