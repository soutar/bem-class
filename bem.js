function BEM (blockName, elementName, modifierNames) {
  this.blockName     = blockName || '';
  this.elementName   = elementName || '';
  this.modifierNames = modifierNames || [];
}

BEM.prototype.block = function (blockName) {
  return new BEM(blockName, this.elementName, null);
}

BEM.prototype.element = function (elementName) {
  return new BEM(this.blockName, elementName, this.modifierNames);
}

BEM.prototype.modifier = function (modifiers) {
  var modifierNames = this.modifierNames.slice();

  switch (typeof modifiers) {
    case 'string':
      modifierNames.push(modifiers);
    break;
    case 'object':
      Object.keys(modifiers).forEach(function(modifierName) {
        modifiers[modifierName] && modifierNames.push(modifierName);
      });
    break;
  }

  return new BEM(this.blockName, this.elementName, modifierNames);
}

BEM.prototype.toString = function() {
  var blockElement = this.blockName + (this.elementName ? '__' + this.elementName : '');
  var classes = [blockElement].concat(this.modifierNames.map(function (modifierName) {
    return blockElement + '--' + modifierName;
  }));

  return classes.join(' ');
}

module.exports = BEM;
