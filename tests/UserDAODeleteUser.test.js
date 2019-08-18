const dao = require('../model/UserDAO.js');

beforeAll(async () => {
    const deleted = await dao.deleteUser("test");
    console.log("*** DELETED " + deleted + " ***")
});

afterEach(async () => {
    await dao.deleteUser("test");
})

test('User that is in database is removed when delete is called', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.deleteUser("test")).toBe(true);

});

test('deleteUser returns false when user that is being deleted does not exist in the database', async () => {
    expect(await dao.deleteUser("userIsNotRegistered")).toBe(false);
});