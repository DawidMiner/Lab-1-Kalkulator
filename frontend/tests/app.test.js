import { appendValue, clearValue } from '../src/calculator';

test('appendValue adds characters', () => {
  let value = "";
  value = appendValue(value, '1');
  value = appendValue(value, '+');
  value = appendValue(value, '2');
  expect(value).toBe('1+2');
});

test('clearValue empties string', () => {
  expect(clearValue()).toBe('');
});
