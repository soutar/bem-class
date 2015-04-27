# bem-class

## Install

```sh
$ npm install --save-dev bem-class
```

## Usage

Shown below is an example `render` method from a React component:

```js
var bem = require('bem-class');

class SomeComponent extends React.Component {
  render () {
    var classes = new bem()
      .block('my-block')
      .element('my-element')
      .modifier({
        'some-enabled-modifier': true,
        'some-disabled-modifier': false
      });

    return (
      // my-block__my-element my-block__my-element--some-enabled-modifier
      <div className={classes}></div>
    );
  }
}
```

The `BEM` class has an overriden `toString` function which returns the complete, space-separated list of class names pertaining to the current instance. 
