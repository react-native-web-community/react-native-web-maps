# react-native-web-maps
> React Native for Web implementation of react-native-maps

## Getting started
`$ npm install react-native-web-maps --save`

Alias the package in your webpack config:

```
resolve: {
    alias: {
        'react-native': 'react-native-web',
        ...
        '{target-module}': 'react-native-web-maps',
    }
}
```

## Usage
[Airbnb/react-native-maps](https://github.com/airbnb/react-native-maps) is the original module.

To use this maps, you need to have a [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
Then add it to your `index.html`, as done in the [preview-head](./docs/.storybook/preview-head.html) file.

## Examples
See the [storybook](https://react-native-web-community.github.io/react-native-web-maps/storybook).

## Contributing
PRs are welcome!
