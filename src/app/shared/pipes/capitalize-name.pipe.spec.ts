import { CapitalizeNamePipe } from './capitalize-name.pipe';

describe('CapitalizeNamePipe', () => {

  let pipe: CapitalizeNamePipe;
  let result: string;

  beforeEach(() => {
    pipe = new CapitalizeNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should handle empty value', () => {
    const input = '';
    result = pipe.transform(input);
    expect(result).toBe(input);
  });

  it('should handle null value', () => {
    const input = null;
    result = pipe.transform(input);
    expect(result).toBe(input);
  });

  it('should handle undefined value', () => {
    const input = undefined;
    result = pipe.transform(input);
    expect(result).toBe(input);
  });

  it('should handle lower cased values', () => {
    const input = 'count dracula';
    result = pipe.transform(input);
    expect(result).toBe('Count Dracula');
  });

  it('should handle upper cased values', () => {
    const input = 'COUNT DRACULA';
    result = pipe.transform(input);
    expect(result).toBe(input);
  });

  it('should handle already capitalized values', () => {
    const input = 'Count Dracula';
    result = pipe.transform(input);
    expect(result).toBe('Count Dracula');
  });

  it('should handle mixed case values', () => {
    const input = 'count Dracula';
    result = pipe.transform(input);
    expect(result).toBe('Count Dracula');
  });

});
