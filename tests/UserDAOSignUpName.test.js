const dao = require('../model/UserDAO.js');

//Forename tests must be between 2 and 32 in length and only alphabetical characters
test('Checks forename with length of 1 with characters only', () => {
  expect(dao.validateForename("a")).toBe(false);
});

test('Checks forename with length of 2 with characters only', () => {
  expect(dao.validateForename("ap")).toBe(true);
});

test('Checks forename with length of 16 with characters only', () => {
  expect(dao.validateForename("applebannacarrot")).toBe(true);
});

test('Checks forename with length of 32 with characters only', () => {
  expect(dao.validateForename("applebannacarrotapplebannacarrot")).toBe(true);
});

test('Checks forename with length of 33 with characters only', () => {
  expect(dao.validateForename("applebannacarrotapplebannacarrotd")).toBe(false);
});

test('Checks forename with length of 16 with characters and numbers', () => {
  expect(dao.validateForename("applebannacar123")).toBe(false);
});

test('Checks forename with length of 16 with characters and numbers and symbols', () => {
  expect(dao.validateForename("applebanna!£$123")).toBe(false);
});

//Surname tests must be between 2 and 64 in length and only alphabetical characters
test('Checks forename with length of 1 with characters only', () => {
  expect(dao.validateSurname("a")).toBe(false);
});

test('Checks forename with length of 2 with characters only', () => {
  expect(dao.validateSurname("ap")).toBe(true);
});

test('Checks forename with length of 32 with characters only', () => {
  expect(dao.validateSurname("applebannacarrotapplebannacarrot")).toBe(true);
});

test('Checks forename with length of 64 with characters only', () => {
  expect(dao.validateSurname("applebannacarrotapplebannacarrotapplebannacarrotapplebannacarrot")).toBe(true);
});

test('Checks forename with length of 65 with characters only', () => {
  expect(dao.validateSurname("applebannacarrotapplebannacarrotapplebannacarrotapplebannacarrotd")).toBe(false);
});

test('Checks forename with length of 32 with characters and numbers', () => {
  expect(dao.validateSurname("applebannacarrotapplebannacar123")).toBe(false);
});

test('Checks forename with length of 32 with characters and numbers and symbols', () => {
  expect(dao.validateSurname("applebannacarrotapplebanna$%^123")).toBe(false);
});

test('Checks forename with length of 64 with characters and spaces only', () => {
  expect(dao.validateSurname("applebannacarrotapplebannacarrot applebannacarrotapplebannacarro")).toBe(true);
});

test('Checks forename with length of 65 with characters and spaces only', () => {
  expect(dao.validateSurname("applebannacarrotapplebannacarrot  applebannacarrotapplebannacarro")).toBe(false);
})
