#!/bin/bash

# 构建项目
echo "Building project..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "The built files are in the 'dist' directory."
    echo ""
    echo "To deploy to GitHub Pages:"
    echo "1. Commit and push your changes to the main branch"
    echo "2. GitHub Actions will automatically deploy to GitHub Pages"
    echo "3. Your site will be available at: https://minnasuu.github.io/"
else
    echo "Build failed!"
    exit 1
fi 