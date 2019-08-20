const dao = require('../model/UserDAO.js');

beforeEach(async (done) => {
  await dao.deleteUser("test");
  return done();
});

test('Checks users can be inserted into database', async () => {
  expect(await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com")).toEqual({status: true, message: "User successfully entered into database"});
});

test('Checks duplicate users cannot be inserted into the database', async () =>{
  await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test1@test.com");
  const actual = await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test1@test.com");
  const expected = {status: false, message: "Not validated. Password may not be sufficiently complex, email may be invalid, username may already exist, etc"};
  expect(actual).toEqual(expected);
});
