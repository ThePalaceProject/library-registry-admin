# Library Registry Administrative Interface

[![Test](https://github.com/ThePalaceProject/library-registry-admin/actions/workflows/test.yml/badge.svg)](https://github.com/ThePalaceProject/library-registry-admin/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/%40thepalaceproject%2Flibrary-registry-admin.svg)](https://badge.fury.io/js/%40thepalaceproject%2Flibrary-registry-admin)
[![Deploy Documentation](https://github.com/ThePalaceProject/library-registry-admin/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/ThePalaceProject/library-registry-admin/actions/workflows/gh-pages.yml)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@thepalaceproject/library-registry-admin/badge)](https://www.jsdelivr.com/package/npm/@thepalaceproject/library-registry-admin)

This is a fork of the NYPL [Library Simplified](http://www.librarysimplified.org/) Library Registry administrative interface maintained and updated for the Palace Project.

## Setup

This package is meant to be used with The Palace Project [Library Registry](https://github.com/thepalaceproject/library-registry).

### Production - CDN

The published version of this interface is into the library registry automatically using the jsDelivr CDN.

### Local development

Suggested local folder setup:
- `/[path to project folder]/library-registry`
- `/[path to project folder]/library-registry-admin`

If you're working on the administrative interface and want to test local changes, you can link your local clone of this repository to your local library registry. These steps will allow you to work on the front-end administrative interface and see updates while developing.

1. Run `npm link` in this `library-registry-admin` repository
2. run `npm link @thepalaceproject/library-registry-admin` from the `admin` folder in the `library-registry` repository
3. run the library registry using `python app.py` at the root in the `library-registry` repository
4. run the web interface using `npm run dev` at the root of this `library-registry-admin` repository
5. visit `localhost:7000/admin/`

Webpack will take care of compiling and updating any new changes made locally for development. Just refresh the page to see updates without having to restart either the `library-registry` or `library-registry-admin` servers.

## Publishing

This package is [published to npm](https://www.npmjs.com/package/@thepalaceproject/library-registry-admin).

We use GitHub Actions for publishing. This package is published automatically when a new release is created in this github repository. This CI process should be used for all releases. Releases should not be manually published to NPM.

## Accessibility

In order to develop user interfaces that are accessible to everyone, there are tools added to the workflow. Besides the Typescript `tslint-react-a11y` plugin, `react-axe` is also installed for local development. Using that module while running the app uses a lot of resources so it should be only when specifically testing for accessibility and not while actively developing new features or fixing bugs.

In order to run the app with `react-axe`, run `npm run dev-test-axe`. This will add a local global variable `process.env.TEST_AXE` (through webpack) that will trigger `react-axe` in `/src/index.tsx`. The output will be seen in the _browser's_ console terminal.

## Tests

Like the codebase, all the unit tests are written in Typescript. Tests are written for all React components as well as redux and utility functions, and all can be found in their respective `__tests__` folders.

To run the tests, perform `npm test`.

We use GitHub Actions for continuous integration. Any pull requests submitted must have tests and those tests must pass during the CI checks.
