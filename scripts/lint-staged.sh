#!/bin/bash
set -euo pipefail

FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(js|ts|jsx|tsx|css|json)$' || true)
[ -z "$FILES" ] && exit 0

echo "Running Prettier..."
if ! echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --write; then
  echo "❌ Prettier failed. Fix issues and try again."
  exit 1
fi

FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(js|ts|jsx|tsx)$' || true)
[ -z "$FILES" ] && exit 0

echo "Running ESLint..."
if ! echo "$FILES" | xargs ./node_modules/.bin/eslint --fix; then
  echo "❌ ESLint failed. Fix issues and try again."
  exit 1
fi

echo "$FILES" | xargs git add

echo "✅ Pre-commit formatting complete."
exit 0
