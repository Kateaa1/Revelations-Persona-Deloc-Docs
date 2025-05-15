const fs = require('fs');
const inputFilename = process.argv[2];

//Greeting
console.log('Thank you for using KateTool_beta3!')

// Check if the input filename is provided
if (!inputFilename) {
  console.error("ERROR: Please input node repack.js <your txt file here> or else it won't work.");
  process.exit(1);
}
console.log('Locating designated output text file...')

// Read the data from the input file
const inputData = fs.readFileSync(inputFilename, { encoding: 'utf8' });
console.log('Output text found. Repacking into BIN...')

// Define the command exceptions
const exceptions = {
//  '[80][A5]': '[75]', <- NEVER EVER ENABLE THIS
  '(close)': '[FF][01]',
  '(key)': '[FF][02]',
  '(n)': '[FF][03]',
  '(clear)': '[FF][04]',
  //here comes the pain train
  '(wait,08)': '[FF][05][08][00]',
  '(wait,10)': '[FF][05][10][00]',
  '(wait,1E)': '[FF][05][1E][00]',
  '(wait,14)': '[FF][05][14][00]',
  '(wait,15)': '[FF][05][15][00]',
  '(wait,20)': '[FF][05][20][00]',
  '(wait,25)': '[FF][05][25][00]',
  '(wait,29)': '[FF][05][29][00]',
  '(wait,30)': '[FF][05][30][00]',
  '(wait,3C)': '[FF][05][3C][00]',
  '(wait,40)': '[FF][05][40][00]',
  '(wait,45)': '[FF][05][45][00]',
  '(wait,4F)': '[FF][05][4F][00]',
  '(wait,50)': '[FF][05][50][00]',
  '(wait,5F)': '[FF][05][5F][00]',
  '(wait,58)': '[FF][05][58][00]',
  '(wait,5C)': '[FF][05][5C][00]',
  '(wait,5E)': '[FF][05][5E][00]',
  '(wait,60)': '[FF][05][60][00]',
  '(wait,64)': '[FF][05][64][00]',
  '(wait,6C)': '[FF][05][6C][00]',
  '(wait,5E)': '[FF][05][5E][00]',
  '(wait,E1)': '[FF][05][E1][00]',
  //CHOO CHOO
  '(color,white)': '[FF][06][00]',
  '(color,blue)': '[FF][06][02]',
  '(color,purple)': '[FF][06][03]',
  '(name)': '[FF][07]',
  '(choice)': '[FF][0E]',
};

// Define the regular exceptions
const exceptions2 = {
  ' ': '[00]',
  'a': '[31]',
  'b': '[32]',
  'c': '[33]',
  'd': '[34]',
  'e': '[35]',
  'f': '[36]',
  'g': '[37]',
  'h': '[38]',
  'i': '[39]',
  'j': '[3A]',
  'k': '[3B]',
  'l': '[3C]',
  'm': '[3D]',
  'n': '[3E]',
  'o': '[3F]',
  'p': '[40]',
  'q': '[41]',
  'r': '[42]',
  's': '[43]',
  't': '[44]',
  'u': '[45]',
  'v': '[46]',
  'w': '[47]',
  'x': '[48]',
  'y': '[49]',
  'z': '[4A]',
  '[80]A': '[80][A6]',
  '[80]B': '[80][A7]',
  '[80]C': '[80][A8]',
  '[80]D': '[80][A9]',
  '[80]E': '[80][AA]',
  '[80]F': '[80][AB]',
  '[80]G': '[80][AC]',
  '[80]H': '[80][AD]',
  '[80]I': '[80][AE]',
  '[80]J': '[80][AF]',
  '[80]K': '[80][B0]',
  '[80]L': '[80][B1]',
  '[80]M': '[80][B2]',
  '[80]N': '[80][B3]',
  '[80]O': '[80][B4]',
  '[80]P': '[80][B5]',
  '[80]Q': '[80][B6]',
  '[80]R': '[80][B7]',
  '[80]S': '[80][B8]',
  '[80]T': '[80][B9]',
  '[80]U': '[80][BA]',
  '[80]V': '[80][BB]',
  '[80]W': '[80][BC]',
  '[80]X': '[80][BD]',
  '[80]Y': '[80][BE]',
  '[80]Z': '[80][BF]',
  "'": '[61]',
  ',': '[65]', 
  ':': '[68]',
  "[80]?": '[80][D0]',
  "[80]!": '[80][D1]',
};
//Replace both expection groups
let formattedData = inputData;
Object.entries(exceptions).forEach(([key, value]) => {
  formattedData = formattedData.split(key).join(value);
});
Object.entries(exceptions2).forEach(([key, value]) => {
  formattedData = formattedData.split(key).join(value);
});

// Remove the square bracket formatting and create a binary string
let binaryString = '';
const regex = /\[(\w{2})\]/g;
let match;
while (match = regex.exec(formattedData)) {
  binaryString += match[1];
}

// Convert the binary string to a Buffer
const binaryData = Buffer.from(binaryString, 'hex');

// Write the binary data to a file
const outputFilename = `${inputFilename.slice(0, -10)}repacked.BIN`;
fs.writeFileSync(outputFilename, binaryData);

//Yay
console.log("Repacking successful! You may now close this window.");