const dao = require('../model/UserDAO.js');

beforeEach(async () => {
    await dao.deleteUser("test");
});

test('User can sign in when they enter the correct username and password', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.signIn('test', 'Test!123')).toBe(true);
});

test('User cannot sign in when they enter an incorrect password for a given username', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.signIn('test', 'Test!123456789')).toBe(false);
});

test('User cannot sign in when they enter an unregistered username and password', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.signIn('ThisAccountIsNotRegistered', 'Password$123')).toBe(false);
});

test('User cannot sign in when they enter a password for another account for a given username', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    await dao.signUp("ThisAccountIsNotRegistered", "Password$123", "Test!123", "test", "von test", "test@test.com");
    expect(await dao.signIn('ThisAccountIsNotRegistered', 'Test!123')).toBe(false);
});