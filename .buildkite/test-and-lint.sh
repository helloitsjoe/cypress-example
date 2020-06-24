echo '--- :yarn: Installing Dependencies!'
yarn --frozen-lockfile

echo '--- :eslint: Linting!'
yarn lint

echo '--- :jest: Testing!'
yarn test

# tar -czf node_modules.tar.gz node_modules
echo 'Testing artifacts' > artifact-test.md
