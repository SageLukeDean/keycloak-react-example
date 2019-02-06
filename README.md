# keycloak-react-example

An example of React code that authenticates using Keycloak

This is a hastily-thrown together example of how one can use the keycloak-js library with React for
simple authentication. I'm publishing this specifically to help a colleague who needs help
quickly. It's not nearly as developed as I'd hoped (no unit tests) but I need to get this
to him in a hurry.

To use this, you need to have a recent version of Yarn.
Go to https://yarnpkg.com and get that if you don't have it.

You also need to have a recent version of NodeJS.

Download this code.
`yarn install` to install dependencies.
Look at `package.json` to see the `scripts` you can run.

`yarn start` will run this project on localhost:8888 so you can keep running your
local Keycloak server on localhost:8080 without conflicts.

See `src/ducks/auth/keycloakWrapper`'s \_getAuthConfig() method for specifying your
local Keycloak configuration. At a minimum, you'll need to give it the right `realm`
and `clientId`

If you go install this into Chrome
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
you'll get a new Redux dev tools tab that will show you everything that's going on
with your application's keycloak state
