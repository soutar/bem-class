class BEM_Modifiable {
    constructor (name) {
      this.name = name;
      this.modifiers = [];
    }

    modifier (modifier) {
        switch (typeof modifier) {
          case 'string':
            this.modifiers.push(modifier);
          break;
          case 'object':
            Object.keys(modifier).forEach((modifierName) => {
              modifier[modifierName] && this.modifiers.push(modifierName);
            });
          break;
        }

        return this;
    }
}

class BEM_Block extends BEM_Modifiable {
    constructor (blockName) {
        super(blockName);
    }

    element (elementName) {
        return new BEM_Element(this, elementName);
    }

    toString () {
        return [this.name].concat(this.modifiers.map((modifierName) => {
          return this.name + '--' + modifierName;
        })).join(' ');
    }
}

class BEM_Element extends BEM_Modifiable {
    constructor (parentBlock, elementName) {
        super(elementName);
        this.block = parentBlock;
    }

    toString () {
        var blockElem = this.block.name + '__' + this.name;

        return [blockElem].concat(this.modifiers.map(function (modifierName) {
          return blockElem + '--' + modifierName;
        })).join(' ');
    }
}

var BEM = {};
BEM.block = (blockName) => new BEM_Block(blockName);

module.exports = BEM;
