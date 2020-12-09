<a href="https://codesandbox.io/embed/github/ben-rogerson/twin.examples/tree/master/react-emotion?file=/src/App.js"><img src="https://i.imgur.com/YyG9s4u.png" alt="twin, react, emotion" width="550"></a>

## Getting started

### 1. Install the dependencies

```bash
# React and Babel
npm install --save react react-dom @babel/core @emotion/babel-plugin-jsx-pragmatic babel-plugin-macros
# Twin and Emotion
npm install --save twin.macro tailwindcss @emotion/react @emotion/styled
```

<details>
  <summary>Yarn instructions</summary>

```bash
# React and Babel
yarn add react react-dom @babel/core @emotion/babel-plugin-jsx-pragmatic babel-plugin-macros
# Twin and Emotion
yarn add twin.macro @emotion/react @emotion/styled
```

</details>

### 2. Add the global styles

Projects using Twin also use the Tailwind [preflight base styles](https://unpkg.com/tailwindcss/dist/base.css) to smooth over cross-browser inconsistencies.

Twin adds the preflight base styles with the `GlobalStyles` import which you can add in `src/App.js`:

```js
// src/App.js
import { GlobalStyles } from 'twin.macro'

const App = () => (
  <div>
    <GlobalStyles />
    {/* ... */}
  </div>
)

export default App
```

`GlobalStyles` also includes some [@keyframes](https://github.com/ben-rogerson/twin.macro/blob/master/src/config/globalStyles.js) so the `animate-xxx` classes have animations and some global css that makes the [ring classes](https://tailwindcss.com/docs/ring-width) work.

### 3. Add the twin config

Twin’s config can get added in a couple of different places.

**a) In a new file named `babel-plugin-macros.config.js` placed in your project root:**

```js
// babel-plugin-macros.config.js
module.exports = {
  twin: {
    preset: 'emotion'
  }
}
```

**b) Or in your `package.json`:**

```js
// package.json
"babelMacros": {
  "twin": {
    "preset": "emotion",
  }
},
```

### 4. Enable babel macros and the jsx pragma

To use the `tw` and `css` props, emotion must first extend jsx with a [jsx pragma](https://emotion.sh/docs/css-prop#jsx-pragma).

The newest version looks like this and sits at the top of your files:

```js
/** @jsxImportSource @emotion/react */
```

**a) Auto inject the pragma:**

You can avoid adding the pragma yourself with the following babel config:

```js
// .babelrc
{
  "plugins": [
    "babel-plugin-macros",
    [
      "@emotion/babel-plugin-jsx-pragmatic",
      {
        "export": "jsx",
        "import": "__cssprop",
        "module": "@emotion/react"
      }
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "__cssprop",
        "pragmaFrag": "React.Fragment"
      }
    ]
  ]
}
```

**b) Or manually specify the jsx pragma in each file:**

First add these babel plugins:

```js
// .babelrc
{
  "plugins": [
    "babel-plugin-macros",
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "__cssprop",
        "pragmaFrag": "React.Fragment"
      }
    ]
  ]
}
```

Then when styling with the tw or css prop, add the pragma at the top of your file. This also replaces the react import:

```js
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

const Input = () => <input tw="bg-black" />
// or
const Input = () => <input css={tw`bg-black`} />
```

> Note: After build, if you’re seeing "process is not defined" then npm install and add `"babel-plugin-transform-inline-environment-variables"` to .babelrc

### 5. Add the types for `css` and `styled` (TypeScript only)

Twin comes with types for every import except the `css` and `styled` imports.

[Add the remaining types →](https://github.com/ben-rogerson/twin.macro/blob/master/docs/typescript.md)

## Twin config options

| Name                  | Type      | Default                | Description                                                                                                               |
| --------------------- | --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| config                | `string`  | `"tailwind.config.js"` | The path to your Tailwind config                                                                                          |
| preset                | `string`  | `"emotion"`            | The css-in-js library behind the scenes - also supports 'styled-components' and 'goober'.                                 |
| hasSuggestions        | `boolean` | `true`                 | Display suggestions when a class isn’t found                                                                              |
| dataTwProp            | `boolean` | `true`                 | Add a prop to your elements in development so you can see the original tailwind classes, eg: `<div data-tw="bg-black" />` |
| debugPlugins          | `boolean` | `false`                | Display generated class information in your terminal from your plugins                                                    |
| debug                 | `boolean` | `false`                | Display information in your terminal about the Tailwind class conversions                                                 |
| disableColorVariables | `boolean` | `false`                | Disable css variables in colors (not gradients) to help support IE11/react native                                         |

## Next steps

- See how to [customize your classes →](https://github.com/ben-rogerson/twin.macro/blob/master/docs/customizing-config.md)
- Learn how to use the emotion library<br/>
  The [css prop](https://emotion.sh/docs/css-prop) / [css import](https://emotion.sh/docs/css-prop#string-styles) / [styled import](https://emotion.sh/docs/styled)

## More examples with Emotion

- React (current)
- [Create React App](https://github.com/ben-rogerson/twin.examples/blob/master/cra-emotion/README.md)
- [Gatsby](https://github.com/ben-rogerson/twin.examples/blob/master/gatsby-emotion/README.md)
- [Next.js](https://github.com/ben-rogerson/twin.examples/blob/master/next-emotion/README.md)
- [Snowpack](https://github.com/ben-rogerson/twin.examples/blob/master/snowpack-react-emotion/README.md)
- [Vue (experimental)](https://github.com/ben-rogerson/twin.examples/blob/master/vue-emotion/README.md)
