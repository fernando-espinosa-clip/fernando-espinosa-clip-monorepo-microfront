const packageJson = require('../package.json');

const sharedModules = () => {
  return {
    ...packageJson.dependencies,
    react: {
      singleton: true,
      requiredVersion: packageJson.dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: packageJson.dependencies['react-dom'],
    },
  };
};

module.exports = {
  sharedModules,
};
