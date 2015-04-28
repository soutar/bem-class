# bem-class

## Install

```sh
$ npm install --save-dev bem-class
```

## Usage

Any call to `BEM.prototype.block`, `BEM.prototype.element` or `BEM.prototype.modifier` will return a new instance of `BEM`, instantiated with the current blockName and elementName, leaving behind any modifiers.

This helps by allowing us to create a single block
```js
var age = 17;
var personBlock = new bem()
  .block('person')
  .modifier({
    'child': (age < 18)
  });

console.log(personBlock.toString()); // "person person--child"
```
then store class names for elements within the block seperately

```js
var isWaving = false;
var handElement = personBlock
  .element('hand')
  .modifier({
    'waving': isWaving
  });

console.log(handElement.toString()); // "person__hand person__hand--child"

var isHungry = true;
var tummyElement = personBlock
  .element('tummy')
  .modifier({
    'rumbling': isHungry
  });

console.log(tummyElement.toString()); // "person__tummy person__tummy--child person__tummy--rumbling"
```

---

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
