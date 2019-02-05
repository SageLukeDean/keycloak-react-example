import debug from 'debug';
import { name } from '../../package.json';

const getNamespace = moduleId =>
  moduleId
    .slice(moduleId.lastIndexOf('/src/') + 5) // throw away everything not right of /src/
    .replace(/\//g, ':') // replace separators with colons
    .replace(/\.js[x]*$/, ''); // remove the .js or .jsx file extension, if any

export default moduleId => {
  localStorage.debug = `${name}:*`;
  const namespace = getNamespace(moduleId);
  const logger = debug(`${name}:${namespace}`);
  return {
    log: (...messages) => {
      messages.forEach(message => logger(message));
    },
  };
};
