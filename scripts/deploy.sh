#!/bin/sh
# dist 폴더를 gh-pages 브랜치로 올려 GitHub Pages에 배포한다
set -e
cd dist
touch .nojekyll
git init -q -b gh-pages
git add -A
git commit -q -m "deploy"
git push -f "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
