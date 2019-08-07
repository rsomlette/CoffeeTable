const dao = require('../model/UserDAO.js');

test('Test user can be retrieved from database', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.getUsername("test")).toBe("test");
});
