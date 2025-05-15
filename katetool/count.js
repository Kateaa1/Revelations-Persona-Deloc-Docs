const args = process.argv.slice(2);
const phrase = args[0]; // get quoted phrase

// Replaces some commands with two X, counting them as two characters
const processedPhrase = phrase.replace(/\((n|key|close|name|clear)\)/g, "XX");

// Replaces [XX] data with a single X, counting as one character
const squareBracketProcessedPhrase = processedPhrase.replace(/\[[^\]]+\]/g, "X");

//No idea what I do here but it works
const waitprocessedPhrase = squareBracketProcessedPhrase.replace("(wait,", "X");

// Replaces some commands with three X, counting them as three characters
const colorprocessedPhrase = waitprocessedPhrase.replace(/\((color,white|color,blue|color,purple)\)/g, "XXX");

const charCount = colorprocessedPhrase.length; // Get length

console.log(`${charCount} HEX <----------------------------`);
console.log(`The phrase "${phrase}" will have ${charCount} HEX characters when repacked!`);
//console.log(colorprocessedPhrase);
