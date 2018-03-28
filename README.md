# create-wreact-app

Boilerplate for React application development.

## Features

- Based on [create-react-app](https://github.com/facebook/create-react-app), and configurations were ejected so you have full control over them.
- Routing and navigation via [react-router](https://github.com/ReactTraining/react-router).
- Application state management via [redux](https://github.com/reactjs/redux) and [immutable](https://github.com/facebook/immutable-js).
- Mock data supported via [fetch-mock](https://github.com/wheresrhys/fetch-mock).
- Routes, redux models and mock data implementations can be scanned and imported automatically.
- Code-splitting and async chunk loading via [webpack](https://github.com/webpack/webpack) and custom component `AsyncWrapper`.
- Uniform localization supported via custom `localeUtils`(locale resources auto-import, template literals supported, get/set current locale, global/local locale resources integration).
- Webpack bundles visualizer and analysis.
- Extra polyfills.

## Usage

To create a new app, run a single command:

```bash
npx create-wreact-app my-app
```

Then a new project will be created, enter the project directory:

```bash
cd my-app
npm i
```

To run the app in development mode, run the command:

```bash
npm start
```

To build the app for production to the `build` folder, run the command:

```bash
npm run build
```

To test the project, run the command:

```bash
npm run test
```

To run eslint, run the command:

```bash
npm run lint
```