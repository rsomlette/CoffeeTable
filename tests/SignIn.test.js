const dao = require('../model/UserDAO.js');

beforeEach(async () => {
    return await dao.deleteUser("test");
});

test('User can sign in when they enter the correct username and password', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    const actual = await dao.signIn('test', 'Test!123');
    const expected = {username:"test", role:"user", status: true};
    expect(actual.username).toBe(expected.username);
    expect(actual.role).toBe(expected.role);
    expect(actual.status).toBe(expected.status)

});

test('User cannot sign in when they enter an incorrect password for a given username', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    const actual = await dao.signIn('test', 'Test!123456789');
    const expected = {status: false};
    expect(actual).toEqual(expected);
});

test('User cannot sign in when they enter an unregistered username and password', async () => {
    const actual = await dao.signIn("ThisAccountIsNotRegistered", "Test!123", "Test!123", "test", "von test", "test@test.com");
    const expected = {status: false};
    expect(actual).toEqual(expected);
});

test('User cannot sign in when they enter a password for another account for a given username', async () => {
    await dao.signUp("test", "Test!123", "Test!123", "test", "von test", "test@test.com");
    const actual = await dao.signIn("ThisAccountIsNotRegistered", "Password$123", "Test!123", "test", "von test", "test@test.com");
    const expected = {status: false};
    expect(actual).toEqual(expected);
});