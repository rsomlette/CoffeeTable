const dao = require('../model/UserDAO.js');

beforeAll(async () => {
  await dao.deleteUser("test");
});

afterEach(async () => {
  await dao.deleteUser("test");
})

test('Returns false if no username is retrieved', async () => {
    expect(await dao.getUsername("userIsNotRegistered")).toBe(false);
});


test('Test user can be retrieved from database', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.getUsername("test")).toBe("test");
});
