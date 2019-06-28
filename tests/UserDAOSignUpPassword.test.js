const dao = require('../model/UserDAO.js');

/*Passwords must have the following structure:
  * 8 - 128 characters in length
  * Contain upper and lowercase characters
  * Contain a number
  * Contain a symbol
  * ^[a-zA-Z0-9\!\#\£\$\%\&\*\^\(\)\-\_\+\=\{\[\]\@\'\}\:\<\>\,\?\.\/\\\\]{8,128}$/
*/

//Length checks
test('Checks confirmPassword returns true when passwords are the same', () => {
  expect(dao.confirmPassword("password", "password")).toBe(true);
});

test('Checks confirmPassword returns true when passwords are the same', () => {
  expect(dao.confirmPassword("password", "passwort")).toBe(false);
});

test('Checks password 7 in length', () => {
  expect(dao.validatePassword("Passw!1")).toBe(false);
});

test('Checks password 8 in length', () => {
  expect(dao.validatePassword("Passwo!1")).toBe(true);
});

test('Checks password 64 in length', () => {
  expect(dao.validatePassword("passpasspasspasspasspassP@12passpasspasspasspasspasspasspasspass")).toBe(true);
});

test('Checks password 128 in length', () => {
  expect(dao.validatePassword("passpasspasspasspasspassP@12passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspass")).toBe(true);
});

test('Checks password 129 in length', () => {
  expect(dao.validatePassword("passpasspasspasspasspassP@12passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspasspassp")).toBe(false);
});

//Format checks
test('Checks password 64 in length, lowercase, uppercase, symbol and number. i.e. correct formatting', () => {
  expect(dao.validatePassword("passpasspasspasspasspasspasspasspasspasspasspasspassPASS1234!£$%")).toBe(true);
});

test('Checks password 64 in length, lowercase only', () => {
  expect(dao.validatePassword("passpasspasspasspasspasspasspasspasspasspasspasspasspasspasspass")).toBe(false);
});

test('Checks password 64 in length, uppercase only', () => {
  expect(dao.validatePassword("PASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASS")).toBe(false);
});

test('Checks password 64 in length, numbers only', () => {
  expect(dao.validatePassword("0123012301230123012301230123012301230123012301230123012301230123")).toBe(false);
});

test('Checks password 64 in length, symbols only', () => {
  expect(dao.validatePassword("!#£$%&*^()-_+={[]@'}:<>,?./\\!#£$%&*^()-_+={[]@'}:<>,?./\\#£$%&*")).toBe(false);
});

test('Checks password 64 in length, lowercase and uppercase only', () => {
  expect(dao.validatePassword("passpasspasspasspasspasspasspasspasspasspasspasspassPASSPASSPASS")).toBe(false);
});

test('Checks password 64 in length, lowercase and numbers only', () => {
  expect(dao.validatePassword("passpasspasspasspasspasspasspasspasspasspasspasspass123412341234")).toBe(false);
});

test('Checks password 64 in length, lowercase and symbols only', () => {
  expect(dao.validatePassword("passpasspasspasspasspasspasspasspasspasspasspasspass!£$%!£$%!£$%")).toBe(false);
});

test('Checks password 64 in length, uppercase and numbers only', () => {
  expect(dao.validatePassword("PASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASS123412341234")).toBe(false);
});

test('Checks password 64 in length, uppercase and symbols only', () => {
  expect(dao.validatePassword("PASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASSPASS!£$%!£$%!£$%")).toBe(false);
});

test('Checks password 64 in length, numbers and symbols only', () => {
  expect(dao.validatePassword("0123012301230123012301230123012301230123012301230123012301230123!£$%!£$%!£$%")).toBe(false);
});
