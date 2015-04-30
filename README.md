# bem-class

## Install

```sh
$ npm install --save-dev bem-class
```

## Usage

Create a new block by calling `bem.block('some-block-name')` and storing the return value. You can apply modifiers to the block by chaining `.modifier({ 'someModifier': true })` onto the end of the `bem.block('')` call.

```js
var bem = require('bem-class');

var age = 17;
var personBlock = bem.block('person')
  .modifier({
    'child': (age < 18)
  });

console.log(personBlock.toString()); // "person person--child"
```

You can create elements by calling `.element('some-element-name')` on the result of `bem.block('')` and storing the return value, or by chaining directly onto the end of the block/modifier call. Elements can also be modified in the same way blocks can, by chaining `.modifier({ 'someModifier': false });` onto the end of the element call.

```js
var isWaving = false;
var handElement = personBlock.element('hand')
  .modifier({
    'waving': isWaving
  });

console.log(handElement.toString()); // "person__hand"

var isHungry = true;
var tummyElement = personBlock.element('tummy')
  .modifier({
    'rumbling': isHungry
  });

console.log(tummyElement.toString()); // "person__tummy person__tummy--rumbling"
```

---

Shown below is an example `render` method from a React component:

```js
var bem = require('bem-class');

class SomeComponent extends React.Component {
  render () {
    var container = bem.block('some-block-name');
    var paragraph = container.element('some-element')
      .modifier({
        'some-enabled-modifier': true,
        'some-disabled-modifier': false
      });

    return (
      <div className={container}>
        <p className={paragraph}></p>
      </div>
    );
  }
}
```

Both `BEM_Block` and `BEM_Element` have a `toString` method which returns the complete, space-separated list of class names pertaining to the current instance.
