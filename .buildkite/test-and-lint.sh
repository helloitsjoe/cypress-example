echo '--- :yarn: Installing Dependencies!'
yarn --frozen-lockfile

echo '--- :eslint: Linting!'
yarn lint

echo '--- :jest: Testing!'
yarn test --coverage
COVERALLS_SERVICE_NAME=buildkite COVERALLS_GIT_BRANCH=coveralls yarn coveralls

# tar -czf node_modules.tar.gz node_modules
# echo '--- Artifacting!'
# echo 'I am in the artifacts file' > artifact-test.txt
