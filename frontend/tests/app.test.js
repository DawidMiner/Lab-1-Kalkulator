/**
 * @jest-environment jsdom
 */
import { append, clearDisplay } from '../src/app';

test('append adds characters to display', () => {
  document.body.innerHTML = '<input id="display" value=""/>';
  append('1');
  expect(document.getElementById('display').value).toBe('1');
  append('+');
  expect(document.getElementById('display').value).toBe('1+');
});

test('clearDisplay empties input', () => {
  document.body.innerHTML = '<input id="display" value="123"/>';
  clearDisplay();
  expect(document.getElementById('display').value).toBe('');
});
