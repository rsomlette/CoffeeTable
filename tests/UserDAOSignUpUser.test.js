const dao = require('../model/UserDAO.js');

beforeEach(async (done) => {
  await dao.deleteUser("test");
  done();
});

test('Checks users can be inserted into database', async () => {
  expect(await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com")).toBe(true);
});

test('Checks duplicate users cannot be inserted into the database', async () =>{
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test1@test.com");
    expect(await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test1@test.com")).toBe(false);
})


test('Checks users can be deleted from database', async () => {
  expect(await dao.deleteUser("test")).toBe(true);
});
