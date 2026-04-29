#!/bin/bash
 
echo "================================"
echo "  Bloggin-Website - Git Push"
echo "================================"
 
# Safety check: make sure .env is not being tracked
echo "Checking .env files are not tracked..."
if git ls-files --error-unmatch backend/.env 2>/dev/null; then
  echo "⚠️  WARNING: backend/.env is tracked! Removing from git..."
  git rm --cached backend/.env
fi
if git ls-files --error-unmatch frontend/.env 2>/dev/null; then
  echo "⚠️  WARNING: frontend/.env is tracked! Removing from git..."
  git rm --cached frontend/.env
fi
if git ls-files --error-unmatch .env 2>/dev/null; then
  echo "⚠️  WARNING: root .env is tracked! Removing from git..."
  git rm --cached .env
fi
 
# Also untrack node_modules if accidentally tracked
git ls-files --error-unmatch backend/node_modules 2>/dev/null && git rm -r --cached backend/node_modules
git ls-files --error-unmatch frontend/node_modules 2>/dev/null && git rm -r --cached frontend/node_modules
 
echo ""
 
# Ask for commit message
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
  commit_msg="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi
 
# Stage all files (respecting .gitignore)
echo "Staging files..."
git add .
 
# Show what's being committed
echo ""
echo "Files staged for commit:"
git status --short
 
echo ""
 
# Confirm before pushing
read -p "Proceed with commit and push? (y/n): " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "Push cancelled."
  exit 0
fi
 
# Commit
git commit -m "$commit_msg"
 
# Push to main (or master)
echo ""
echo "Pushing to GitHub..."
git push -u origin main 2>/dev/null || git push -u origin master
 
echo ""
echo "✅ Done! Your code is live at:"
echo "   https://github.com/rdgtech-ctrl/Blogging-Website.git"
echo ""
echo "🔒 Your .env files were NOT pushed. They are safe."