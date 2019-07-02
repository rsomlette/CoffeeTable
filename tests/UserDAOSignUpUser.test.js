const dao = require('../model/UserDAO.js');

test('Checks users can be inserted into database', async () => {
  expect(await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com")).toBe(true);
});


test('Checks users can be deleted from database', async () => {
  expect(await dao.deleteUser("test")).toBe(true);
});
