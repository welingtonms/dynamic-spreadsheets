# Dynamic spreadsheets

## How to setup

In order to get the project up and running, you should the following steps:

- Firstly, make sure you have installed _node_ `>=12.5.0` and _npm_ `>=6.9.0`, with the package manager [yarn](https://yarnpkg.com/) (recommended, but not required; you can use _npm_ as well).
- Run `yarn install` (or `npm install`) to install all required dependencies
- Now run `yarn start` (or `npm start`)

Your browser should open at `http://localhost:3000/`.

## Tests

Due to time restrictions I added unit tests to the
components I thought to be critical for the required flows to work properly.

To the other components, I tried to cover their proper behavior while testing the expect application flows.

### Unit tests

Run them with `yarn test` (or `npm test`)

### Integration tests

I used [Cypress](https://www.cypress.io/) to implement my integration tests. I like this tool because it has an easy to understand syntax and it way easier to use than WebdriverIO.

Although not fully covering all most used browsers, the lastest version added support to Firefox, which is a good reason to all frontend developers out there to sleep with a hopeful smile on their faces.

Run them with `yarn cypress` (or `npm run cypress`)
