export class BEM_Modifiable {
    constructor (name) {
      if (typeof name !== 'string') throw new Error('Please specify a name for this BEM modifiable');
      this.name = name;
      this.modifiers = [];
    }

    modifier (modifier) {
        switch (Object.prototype.toString.call(modifier)) {
          case '[object String]':
            this.modifiers.push(modifier);
          break;
          case '[object Object]':
            Object.keys(modifier).forEach((modifierName) => {
              modifier[modifierName] && this.modifiers.push(modifierName);
            });
          break;
          case '[object Array]':
            modifier.forEach((modifierName) => {
                this.modifiers.push(modifierName);
            })
          break;
        }

        return this;
    }
}

export class BEM_Block extends BEM_Modifiable {
    constructor (blockName) {
        if (typeof blockName !== 'string') throw new Error('Please specify a name for this BEM block');
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

export class BEM_Element extends BEM_Modifiable {
    constructor (parentBlock, elementName) {
        if (!(parentBlock instanceof BEM_Block)) throw new Error('Please provide a parent block');
        if (typeof elementName !== 'string') throw new Error('Please specify a name for this BEM element');
        super(elementName);
        this.block = parentBlock;
    }

    toString () {
        var blockElem = this.block.name + '__' + this.name;

        return [blockElem].concat(this.modifiers.map(function (modifierName) {
          return blockElem + '--' + modifierName;
        })).join(' ');
    }

    copy () {
        var newModifiable = new this.constructor(this.block, this.name);
        newModifiable.modifiers = [].concat(this.modifiers);
        return newModifiable;
    }
}

export function block (blockName) {
  return new BEM_Block(blockName);
}
