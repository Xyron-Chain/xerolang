const Zerolang = require('./Zerolang'); // Adjust the path as needed

describe('Zerolang', () => {
    const zerolang = new Zerolang();

    test('Tokenization', () => {
        const inputCode = `a = 3; b = 7; c = 8;`;
        const tokenizedCode = zerolang.tokenize(inputCode);
        const expectedTokens = ['a', 'EQ', "3", 'NEXT', 'b', 'EQ', "7", 'NEXT', 'c', 'EQ', "8", 'NEXT'];
        expect(tokenizedCode).toEqual(expectedTokens);
    });

    test('Execution - Basic Operations', () => {
        const tokenizedCode = ['a', 'EQ', "3", 'NEXT', 'b', 'EQ', "7", 'NEXT', 'sum', 'EQ', 'a', 'ADD', 'b', 'NEXT', 'LOG', 'sum', 'NEXT'];
        const result = zerolang.execute(tokenizedCode);
        const expectedResult = [10];
        expect(result).toEqual(expectedResult);
    });
});
