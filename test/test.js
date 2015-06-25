import assert from 'assert';
import { BEM_Modifiable, BEM_Block, BEM_Element } from '../src/bem';

describe('BEM_Modifiable', () => {
  describe('constructor()', () => {
    it('should take a name and set it on the instance', () => {
      var modifiable = new BEM_Modifiable('modifiable');

      assert.equal('modifiable', modifiable.name);
    });

    it('should throw an error if git a non-string name is provided', () => {
      assert.throws(() => {
        var modifiable = new BEM_Modifiable();
      }, Error);
    });
  });

  describe('modifier()', () => {
    it('should take a string and apply it as a modifier', () => {
        let modifiable = new BEM_Modifiable('modifiable').modifier('modifier');

        assert(modifiable.modifiers.indexOf('modifier') > -1);
    });

    it('should take an object and apply truthy modifiers', () => {
      let modifiable = new BEM_Modifiable('modifiable').modifier({
        'enabled': true
      });

      assert.equal(true, (modifiable.modifiers.indexOf('enabled') > -1));
    });

    it('should take an object and ignore falsey modifiers', () => {
      let modifiable = new BEM_Modifiable('modifiable').modifier({
        'disabled': false
      });

      assert.equal(-1, modifiable.modifiers.indexOf('disabled'));
    });

    it('should take an array and apply all elements as modifiers', () => {
      let modifiable = new BEM_Modifiable('modifiable').modifier([
        'modifier1',
        'modifier2',
        'modifier3'
      ]);

      assert(modifiable.modifiers.indexOf('modifier1') > -1);
      assert(modifiable.modifiers.indexOf('modifier2') > -1);
      assert(modifiable.modifiers.indexOf('modifier3') > -1);
    });
  });

});

describe('BEM_Block', () => {
  describe('constructor()', () => {
    it('should take a name and set it on the instance', () => {
      var block = new BEM_Block('block');

      assert.equal('block', block.name);
    });

    it('should throw an error if a non-string name is provided', () => {
      assert.throws(() => {
        var block = new BEM_Block();
      }, Error);
    });
  });

  describe('element()', () => {
    it('should return a new BEM_Element', () => {
      let element = new BEM_Block('block').element('element');

      assert.equal(true, (element instanceof BEM_Element));
    });
  });

  describe('toString()', () => {
    it('should return only the block class when no modifiers are applied', () => {
      let block = new BEM_Block('block-name');

      assert.equal('block-name', block.toString());
    });

    it('should return a space seperated list of class names when modifiers are applied', () => {
      let block = new BEM_Block('block-name').modifier({
        'modifier1': true,
        'modifer2': true
      });

      assert.equal(true, (block.toString().split(' ').length > 1));
    });

    it('should include truthy modifiers', () => {
      let block = new BEM_Block('block-name').modifier({
        'modifier1': true,
        'modifier2': true
      });

      assert.equal(true, (block.toString().indexOf('block-name--modifier1') > -1));
      assert.equal(true, (block.toString().indexOf('block-name--modifier2') > -1));
    });

    it('should exclude falsey modifiers', () => {
      let block = new BEM_Block('block-name').modifier({
        'modifier1': false,
        'modifier2': false
      });

      assert.equal(true, (block.toString().indexOf('block-name--modifier1') === -1));
      assert.equal(true, (block.toString().indexOf('block-name--modifier2') === -1));
    });

    it('should contain n+1 classes in a space separated list, where n is the amount of truthy modifiers', () => {
      let modifiers = {
        'modifier1': false,
        'modifier2': true,
        'modifier3': true,
        'modifier4': false
      };
      let block = new BEM_Block('block-name').modifier(modifiers);

      assert.equal(
        Object.keys(modifiers).filter(modifierName => !!modifiers[modifierName]).length + 1,
        block.toString().split(' ').length);
    });
  });
});

describe('BEM_Element', () => {
  describe('constructor()', () => {
    it('should take a name and set it on the instance', () => {
      var block = new BEM_Block('block');
      var element = new BEM_Element(block, 'element');

      assert.equal('element', element.name);
    });

    it('should throw an error if a non-string name is provided', () => {
      assert.throws(() => {
        var block = new BEM_Block('block');
        var element = new BEM_Element(block, null);
      }, Error);
    });

    it('should throw an error if a BEM_Block is not provided', () => {
      assert.throws(() => {
        var element = new BEM_Element();
      }, Error);
    });
  });

  describe('toString()', () => {
    it('should return only the element class when no modifiers are applied', () => {
      let block = new BEM_Block('block-name');
      let element = new BEM_Element(block, 'element-name');

      assert.equal('block-name__element-name', element.toString());
    });

    it('should return a space seperated list of class names when modifiers are applied', () => {
      let block = new BEM_Block('block-name');
      let element = new BEM_Element(block, 'element-name').modifier({
        'modifier1': true,
        'modifer2': true
      });

      assert.equal(true, (element.toString().split(' ').length > 1));
    });

    it('should include truthy modifiers', () => {
      let block = new BEM_Block('block-name');
      let element = new BEM_Element(block, 'element-name').modifier({
        'modifier1': true,
        'modifier2': true
      });

      assert.equal(true, (element.toString().indexOf('block-name__element-name--modifier1') > -1));
      assert.equal(true, (element.toString().indexOf('block-name__element-name--modifier2') > -1));
    });

    it('should exclude falsey modifiers', () => {
      let block = new BEM_Block('block-name');
      let element = new BEM_Element(block, 'element-name').modifier({
        'modifier1': false,
        'modifier2': false
      });

      assert.equal(true, (element.toString().indexOf('block-name--modifier1') === -1));
      assert.equal(true, (element.toString().indexOf('block-name--modifier2') === -1));
    });

    it('should contain n+1 classes in a space separated list, where n is the amount of truthy modifiers', () => {
      let modifiers = {
        'modifier1': false,
        'modifier2': true,
        'modifier3': true,
        'modifier4': false
      };
      let block = new BEM_Block('block-name');
      let element = new BEM_Element(block, 'element-name').modifier(modifiers);

      assert.equal(
        Object.keys(modifiers).filter(modifierName => !!modifiers[modifierName]).length + 1,
        element.toString().split(' ').length);
    });
  });

  describe('copy()', () => {
    it('should return a new BEM_Element instance with the same name, parent block and modifiers', () => {
      let block = new BEM_Block('block-name');
      let element = new BEM_Element(block, 'element-name').modifier({
        'modifier1': false,
        'modifier2': false
      });
      let copy = element.copy();

      assert(copy instanceof BEM_Element);
      assert.equal(copy.name, element.name);
      assert.equal(copy.block, element.block);
      assert.deepEqual(copy.modifiers, element.modifiers);
    });
  });
});
