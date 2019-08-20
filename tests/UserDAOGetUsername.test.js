const dao = require('../model/UserDAO.js');

beforeAll(async () => {
  return await dao.deleteUser("test");
});

test('Returns false if no username is retrieved', async () => {
  const actual = await dao.getUsername("userIsNotRegistered");
  const expected = false;
  expect(actual).toBe(expected);
});


test('Test user can be retrieved from database', async () => {
  await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
  const actual = await dao.getUsername("test");
  const expected = "test";
  expect(actual).toBe(expected);
});