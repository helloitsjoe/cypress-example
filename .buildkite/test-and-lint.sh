echo '--- :yarn: Installing Dependencies!'
yarn --frozen-lockfile

echo '--- :eslint: Linting!'
yarn lint

echo '--- :jest: Testing!'
yarn test --coverage

echo '--- :coverage: Coveralls!'
echo $COVERALLS_REPO_TOKEN
COVERALLS_SERVICE_NAME=buildkite COVERALLS_GIT_BRANCH=master yarn coveralls

# tar -czf node_modules.tar.gz node_modules
# echo '--- Artifacting!'
# echo 'I am in the artifacts file' > artifact-test.txt
