function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

describe('Math Function', () => {
  let num1 = 5;
  let num2 = 2;
  describe('Add', () => {
    test('adds the numbers', () => {
      let result = add(num1, num2);
      expect(result).toBe(7);
    });
  });
  describe('Subtract', () => {
    test('subtracts the numbers', () => {
      let result = subtract(num1, num2);
      expect(result).toBe(3);
    });
  });
});
