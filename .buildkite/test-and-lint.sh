echo '--- :yarn: Installing Dependencies!'
yarn --frozen-lockfile

echo '--- :eslint: Linting!'
yarn lint

echo '--- :jest: Testing!'
yarn test --coverage
yarn coveralls

# tar -czf node_modules.tar.gz node_modules
# echo '--- Artifacting!'
# echo 'I am in the artifacts file' > artifact-test.txt
