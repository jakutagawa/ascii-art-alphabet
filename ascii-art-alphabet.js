#! /usr/local/bin/node

// handles argument for word input
var wordInput = process.argv[2];
console.log('You entered ' + wordInput);

// instantiates counters and empty arrays
var lineNum = 0
var letterArray = [];
var asciiArray = [];
var colNum = 0;
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// needed for loading text file
var fs = require('fs');
var readline = require('readline');

convertWord(callback => {
    array = callback

    var rowArray = ['', '', '', '', '', '', '', '', '', '', '', '']
    // converts entire string to lowercase
    var lowerCapWordInput = wordInput.toLowerCase();
    for (var j = 0; j < lowerCapWordInput.length; j++) {
        // checks for alpha characters
        if (!alphabet.includes(lowerCapWordInput[j])) {
            console.log('Input included invalid characters: ' + lowerCapWordInput[j]);
            break
            //throw new Error ("wrong characters")
        } else {
            // converts letter to unicode
            var charCode = lowerCapWordInput[j].charCodeAt(0) - 32;
            // adds letter row to larger row
            for (var row = 0; row < 12; row++) {
                rowArray[row] += array[charCode][row]
            }
        }
    }
    // outputs final rows to console
    for (var row = 0; row < 12; row++) {
        console.log(rowArray[row])
    }
})

// defines function to load the font file and process it
function convertWord(callback) {
    var fontfile = readline.createInterface({
        input: fs.createReadStream('poison.flf'),
        terminal: false
    })
    fontfile.on('line', function(line) {
        lineNum++;
        var cleanedLine = '';
        // skips intro comment line
        if (lineNum > 15) {
            for (var i = 0; i < line.length - 1; i++) {
                // removes extra @ at the end of each character
                if ((colNum == 11) && (i == (line.length - 2))) {
                    cleanedLine += ''
                    // adds hard spaces when necessary
                } else if (line[i] == '$') {
                    cleanedLine += ' '
                } else {
                    cleanedLine += line[i]
                }
            }

            // adds cleaned line to array
            letterArray.push(cleanedLine)

            // adds full letter array to larger font library array
            if (colNum == 11) {
                asciiArray.push(letterArray)
                letterArray = [];
                colNum = 0;
            } else {
                colNum++;
            }
        }
    })
    // sends font library back
    fontfile.on('close', function() {
        callback(asciiArray)
    });
}
