const { add, subtract } = require('./math/index.js');

describe('Math Functions', () => {
  let num1 = 5;
  let num2 = 2;
  describe('Add function', () => {
    test('adds the numbers together', () => {
      let result = add(num1, num2);
      expect(result).toBe(7);
    });
  });
  describe('Subtract function', () => {
    test('subtracts the two numbers', () => {
      let result = subtract(num1, num2);
      expect(result).toBe(3);
    });
  });
  describe('Multiply function', () => {
    test.todo('multiplies the numbers');
  });
});
