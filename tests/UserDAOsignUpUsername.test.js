const dao = require('../model/UserDAO.js');


///^[a-zA-Z0-9]{3,32}$/;

//Character only tests
test('Checks username with length of 1 with characters only', () => {
  expect(dao.validateUsername("a")).toBe(false);
});

test('Checks username with length of 3 with characters only', () => {
  expect(dao.validateUsername("app")).toBe(true);
});

test('Checks username with length of 16 with characters only', () => {
  expect(dao.validateUsername("applebannacarrot")).toBe(true);
});

test('Checks username with length of 32 with characters only', () => {
  expect(dao.validateUsername("applebannacarrotapplebannacarrot")).toBe(true);
});

test('Checks username with length of 33 with characters only', () => {
  expect(dao.validateUsername("applebannacarrotapplebannacarrotd")).toBe(false);
});

//Character and numbers test
test('Checks username with length of 3 with numbers and characters', () => {
  expect(dao.validateUsername("ap1")).toBe(true);
});

test('Checks username with length of 16 with numbers and characters', () => {
  expect(dao.validateUsername("applebannacar123")).toBe(true);
});

test('Checks username with length of 32 with numbers and characters', () => {
  expect(dao.validateUsername("applebannacarrotapplebannacar123")).toBe(true);
});

test('Checks username with length of 33 with numbers and characters', () => {
  expect(dao.validateUsername("applebannacarrotapplebannacarr123")).toBe(false);
});


//Numbers only tests
test('Checks username with length of 1 with numbers only', () => {
  expect(dao.validateUsername("1")).toBe(false);
});

test('Checks username with length of 3 with numbers only', () => {
  expect(dao.validateUsername("123")).toBe(true);
});

test('Checks username with length of 16 with numbers only', () => {
  expect(dao.validateUsername("1234567890123456")).toBe(true);
});

test('Checks username with length of 32 with numbers only', () => {
  expect(dao.validateUsername("12345678901234567890123456789012")).toBe(true);
});

test('Checks username with length of 33 with numbers only', () => {
  expect(dao.validateUsername("123456789012345678901234567890123")).toBe(false);
});

//Symbols
test('Checks username with length of 1 with symbols only', () => {
  expect(dao.validateUsername("!")).toBe(false);
});

test('Checks username with length of 3 with symbols only', () => {
  expect(dao.validateUsername("*^%")).toBe(false);
});

test('Checks username with length of 16 with symbols only', () => {
  expect(dao.validateUsername("!\"£$%^&*()_-+=¬")).toBe(false);
});

test('Checks username with length of 32 with symbols only', () => {
  expect(dao.validateUsername("!\"£$%^&*()_-+=¬!\"£$%^&*()_-+=¬")).toBe(false);
});

test('Checks username with length of 33 with symbols only', () => {
  expect(dao.validateUsername("!\"£$%^&*()_-+=¬!\"£$%^&*()_-+=¬'")).toBe(false);
});

//Characters, numerical and symbols
test('Checks username with length of 3 with numbers and characters', () => {
  expect(dao.validateUsername("a!1")).toBe(false);
});

test('Checks username with length of 16 with numbers and characters and symbols', () => {
  expect(dao.validateUsername("applebanna123!£$")).toBe(false);
});

test('Checks username with length of 32 with numbers and characters', () => {
  expect(dao.validateUsername("applebannacarrotapplebanna&%^123")).toBe(false);
});

test('Checks username with length of 33 with numbers and characters', () => {
  expect(dao.validateUsername("applebannacarrotapplebannac/*-123")).toBe(false);
});
