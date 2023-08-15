class Zerolang {
    tokenMap = {
        '=': 'EQ',
        '+': 'ADD',
        '-': 'SUB',
        '*': 'MUL',
        '/': 'DIV',
        'log': 'LOG',
        ';': 'NEXT'
    };

    tokenize(inputCode) {
        const extracted = inputCode.split(/\s/).filter(line => line.trim().length > 0);
        const tokens = [];

        extracted.forEach((token) => {
            tokens.push( this.tokenMap[token.toString()] ? this.tokenMap[token] : token.split(';')[0] );
            if(token.includes(';')){
                tokens.push('NEXT')
            }
        })

        return tokens;
    }

    execute(tokenizedCode) {
        const variables = {};
        let currentVariable = '';
        let result = [];

        for(let i = 0; i < tokenizedCode.length; i++){
            if(tokenizedCode[i] == 'ADD') {
                tokenizedCode[i] = Number(variables[tokenizedCode[i-1]]) + Number(variables[tokenizedCode[i+1]]); 
                tokenizedCode.splice(i-1, 1);
                tokenizedCode.splice(i+1, 1);
            }
            if(tokenizedCode[i] == 'SUB') {
                tokenizedCode[i] = Number(variables[tokenizedCode[i-1]]) - Number(variables[tokenizedCode[i+1]]); 
                tokenizedCode.splice(i-1, 1);
                tokenizedCode.splice(i+1, 1);
            }
            if(tokenizedCode[i] == 'DIV') {
                tokenizedCode[i] = Number(variables[tokenizedCode[i-1]]) / Number(variables[tokenizedCode[i+1]]); 
                tokenizedCode.splice(i-1, 1);
                tokenizedCode.splice(i+1, 1);
            }
            if(tokenizedCode[i] == 'MUL') {
                tokenizedCode[i] = Number(variables[tokenizedCode[i-1]]) * Number(variables[tokenizedCode[i+1]]); 
                tokenizedCode.splice(i-1, 1);
                tokenizedCode.splice(i+1, 1);
            }
            if(tokenizedCode[i] == 'EQ') {
                if(variables[tokenizedCode[i+1]]) {
                    variables[tokenizedCode[i-1]] = variables[tokenizedCode[i+1]];
                } else {
                    variables[tokenizedCode[i-1]] = tokenizedCode[i+1];
                }
            }
        }

        for(let i = 0; i < tokenizedCode.length; i++){
            if(tokenizedCode[i] == 'EQ') {
                if(variables[tokenizedCode[i+1]]) {
                    variables[tokenizedCode[i-1]] = variables[tokenizedCode[i+1]];
                } else {
                    variables[tokenizedCode[i-1]] = tokenizedCode[i+1];
                }
            }
            if(tokenizedCode[i] == 'LOG') {
                if(variables[tokenizedCode[i+1]]) {
                    result.push(variables[tokenizedCode[i+1]]);
                }else{
                     result.push(tokenizedCode[i+1]);
                }
            }
        }

        return result;
    }
}

module.exports = Zerolang;