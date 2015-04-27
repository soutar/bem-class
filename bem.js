function BEM () {
  this.blockName     = '';
  this.elementName   = '';
  this.modifierNames = [];
}

BEM.prototype.block = function (blockName) {
  this.blockName = blockName;
  return this;
}

BEM.prototype.element = function (elementName) {
  this.elementName = elementName;
  return this;
}

BEM.prototype.modifier = function (modifiers) {
  var _this = this;

  switch (typeof modifiers) {
    case 'string':
      this.modifierNames.push(modifiers);
    break;
    case 'object':
      Object.keys(modifiers).forEach(function(modifierName) {
        modifiers[modifierName] && _this.modifierNames.push(modifierName);
      });
    break;
  }

  return this;
}

BEM.prototype.toString = function() {
  var _this = this;

  var classes;
  var blockElement = this.blockName + '__' + this.elementName;
  var modifiers = this.modifierNames.map(function (modifierName) {
    return _this.blockName + '__' + _this.elementName + '--' + modifierName;
  });

  classes = modifiers;
  classes.unshift(blockElement);

  return classes.join(' ');
}

module.exports = BEM;
