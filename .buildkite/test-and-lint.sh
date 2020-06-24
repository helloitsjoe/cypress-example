echo '--- :yarn: Installing Dependencies!'
yarn --frozen-lockfile

echo '--- :eslint: Linting!'
yarn lint

echo '--- :jest: Testing!'
yarn test
