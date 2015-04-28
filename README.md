# bem-class

## Install

```sh
$ npm install --save-dev bem-class
```

## Usage

Create a new block by calling `var block = bem.block('some-block-name')` and apply any neccessary modifiers with `block.modifier({ // modifiers })`

```js
var bem = require('bem-class');

var age = 17;
var personBlock = bem.block('person')
  .modifier({
    'child': (age < 18)
  });
  
console.log(personBlock.toString()); // "person person--child"
```

You can then extend this block object and create an element object with `var element = block.element('some-element-name')`

```js
var isWaving = false;
var handElement = personBlock.element('hand')
  .modifier({
    'waving': isWaving
  });

console.log(handElement.toString()); // "person__hand"
  
var isHungry = true;
var tummyElement = personBlock
  .element('tummy')
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
    var block = bem.block('some-block-name');
    var element = container.element('some-element')
      .modifier({
        'some-enabled-modifier': true,
        'some-disabled-modifier': false
      });

    return (
      <div className={block}>
        <p className={element}></p>
      </div>
    );
  }
}
```

Both `BEM_Block` and `BEM_Element` have a `toString` method which returns the complete, space-separated list of class names pertaining to the current instance.