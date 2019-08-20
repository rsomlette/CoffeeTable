const hashString = require('../utils/hashString').hashString;

test('hashString returns the expected hash', async () => {
  const actual = await hashString("test input");
  const expected = "9dfe6f15d1ab73af898739394fd22fd72a03db01834582f24bb2e1c66c7aaeae"
  expect(actual).toBe(expected);
});
