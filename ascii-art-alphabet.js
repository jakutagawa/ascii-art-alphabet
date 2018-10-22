#! /usr/local/bin/node

var wordInput = process.argv[2];
console.log('You entered ' + wordInput);
var lowerCapWordInput = wordInput.toLowerCase();

var lineNum = 0
var lineArray = [];
var asciiArray = [];
var colNum = 0;
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var fs = require('fs');
var readline = require('readline');

convertWord(callback => {
    array = callback

    var rowString = ''
    var rowArray = ['', '', '', '', '', '', '', '', '', '', '', '']
    for (var j = 0; j < lowerCapWordInput.length; j++) {
        if (!alphabet.includes(lowerCapWordInput[j])) {
            console.log('Input included invalid characters: ' + lowerCapWordInput[j]);
            break
            //throw new Error ("wrong characters")
        } else {
            var charCode = lowerCapWordInput[j].charCodeAt(0) - 32;
            for (var row = 0; row < 12; row++) {
                rowArray[row] += array[charCode][row]
            }
        }
    }
    for (var row = 0; row < 12; row++) {
        console.log(rowArray[row])
    }
})

function convertWord(callback) {
    var fontfile = readline.createInterface({
        input: fs.createReadStream('poison.flf'),
        terminal: false
    })
    fontfile.on('line', function(line) {
        lineNum++;
        var strippedLine = '';
        if (lineNum > 15) {
            for (var i = 0; i < line.length - 1; i++) {
                if ((colNum == 11) && (i == (line.length - 2))) {
                    strippedLine += ''
                } else if (line[i] == '$') {
                    strippedLine += ' '
                } else {
                    strippedLine += line[i]
                }
            }

            lineArray.push(strippedLine)

            if (colNum == 11) {
                asciiArray.push(lineArray)
                lineArray = [];
                colNum = 0;
            } else {
                colNum++;
            }
        }
    })
    fontfile.on('close', function() {
        callback(asciiArray)
    });
}
