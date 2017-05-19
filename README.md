# React Property Provider

[![Build Status](https://travis-ci.org/AlbinTheander/react-property-provider.svg?branch=master)](https://travis-ci.org/AlbinTheander/react-property-provider) [![npm version](https://img.shields.io/npm/v/react-property-provider.svg)](https://www.npmjs.com/package/react-property-provider) [![Coverage Status](https://coveralls.io/repos/github/AlbinTheander/react-property-provider/badge.svg?branch=master)](https://coveralls.io/github/AlbinTheander/react-property-provider?branch=master)

React Property Provider aims at making it easier to use the React context to
pass information down to a subtree of components without having to use properties.

## Installation
React Property Provider requires React v15.5 or later.
```
npm install --save react-property-provider
```

## When to Use

If you want to pass properties down a subtree without having to add props
to all intermediary components and you don't have any other good solution,
then this might be for you.

## Usage
You use the `PropertyProvider` component to add properties to a subtree and the
`withProperties` wrapper to pick them up.

Example:
```jsx
import React from 'react';
import PropertyProvider from 'react-property-provider';

// App component
function App(props) {
    return (
        <App>
            <PropertyProvider themeColor="blue" greeting="Hello!">
                <Pane position="Left"/>
            </PropertyProvider>
            <PropertyProvider themeColor="red" greeting="Yo!">
                <Pane position="Right"/>
            </PropertyProvider>
        </App>
    );
}

function Pane() {
    return (
        <div>
            <ThemedGreeting />
            Some text that you won't read.
        </div>
    );
}

function PureThemedGreeting({themeColor, greeting}) {
    return <div style={{color:themeColor}}>{greeting}</div>;
}
const ThemedGreeting =
    withProperties(PureThemedGreeting, 'themeColor', 'greeting');
```

Notice how the `App` component adds different values to different subtrees.
The `Pane` component does not care for neither theme color nor the greeting
phrase. In the end, `ThemedGreeting` will pick up the specified properties
and inject them into the pure `PureThemedGreeting`.

Traditionally, you would pass these values as properties to the `Pane`
component which would pass them on to `ThemedGreeting`.

## More Information

* React Property Provider is basically just a layer on top of the React context. [Here is more information about the React context and why not to use it](https://facebook.github.io/react/docs/context.html).
* [This article](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076) by Michel Weststrate was the inspiration for this library.
* [Redux](https://github.com/reactjs/react-router-redux) is absolutely something to consider for a larger application, and may very well solve your problem.
* There are other ways than just props and redux for inter-component communcation. [This article](http://andrewhfarmer.com/component-communication/) is a good overview.

## License

MIT
