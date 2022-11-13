import { reverseItems } from "./utils";

describe('Testing the String Reversal Algorithm', () => {
  it('with an even percentage of characters', () => {
    expect(reverseItems('1234')).toEqual('4321');
  });

  it('with an odd number of characters', () => {
    expect(reverseItems('12345')).toEqual('54321');
  });

  it('with one character', () => {
    expect(reverseItems('1')).toEqual('1');
  });

  it('with empty string', () => {
    expect(reverseItems('')).toEqual('');
  });
});