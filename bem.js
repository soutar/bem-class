var BEM = {};

BEM.block = function (blockName) {
  return new BEM_Block(blockName);
};

function BEM_Block (blockName) {
  this.name = blockName;
  this.modifiers = [];
}

BEM_Block.prototype.element = function (elementName) {
  return new BEM_Element(this, elementName)
}

BEM_Block.prototype.toString = function () {
  var name = this.name;

  return [name].concat(this.modifiers.map(function (modifierName) {
    return name + '--' + modifierName;
  })).join(' ');
}

function BEM_Element (parentBlock, elementName) {
  this.block = parentBlock;
  this.name = elementName; 
  this.modifiers = [];
}

BEM_Element.prototype.toString = function () {
  var blockElem = this.block.name + '__' + this.name;

  return [blockElem].concat(this.modifiers.map(function (modifierName) {
    return blockElem + '--' + modifierName;
  })).join(' ');
}

BEM_Block.prototype.modifier = BEM_Element.prototype.modifier = function (modifier) {
  var _this = this;

  switch (typeof modifier) {
    case 'string':
      this.modifiers.push(modifier);
    break;
    case 'object':
      Object.keys(modifier).forEach(function(modifierName) {
        modifier[modifierName] && _this.modifiers.push(modifierName);
      });
    break;
  }

  return this;
}

module.exports = BEM;
