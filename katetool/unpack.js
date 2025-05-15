const fs = require('fs');
const filename = process.argv[2];

//Greeting
console.log('Thank you for using KateTool_beta3!')

// Check if the filename is provided
if (!filename) {
  console.error("ERROR: Please input node unpack.js <your BIN file here> or else it won't work.");
  process.exit(1);
}
console.log('Locating designated BIN...')

// Read the data from the specified file
const data = fs.readFileSync(filename);
console.log('BIN found. Unpacking...')

// Format the data as [XX][XX][XX][XX]
let formattedData = '';
for (let i = 0; i < data.length; i++) {
  formattedData += '[' + ('00' + data[i].toString(16)).slice(-2).toUpperCase() + ']';
}

// Define the exceptions
const exceptions = {
  '[FF][01]': '(close)',
  '[FF][02]': '(key)',
  '[FF][03]': '(n)',
  '[FF][04]': '(clear)',
  //forgive me lord for what I'm about to do
  '[FF][05][08][00]': '(wait,08)',
  '[FF][05][10][00]': '(wait,10)',
  '[FF][05][1E][00]': '(wait,1E)',
  '[FF][05][14][00]': '(wait,14)',
  '[FF][05][15][00]': '(wait,15)',
  '[FF][05][20][00]': '(wait,20)',
  '[FF][05][25][00]': '(wait,25)',
  '[FF][05][29][00]': '(wait,29)',
  '[FF][05][30][00]': '(wait,30)',
  '[FF][05][3C][00]': '(wait,3C)',
  '[FF][05][40][00]': '(wait,40)',
  '[FF][05][45][00]': '(wait,45)',
  '[FF][05][4F][00]': '(wait,4F)',
  '[FF][05][50][00]': '(wait,50)',
  '[FF][05][5F][00]': '(wait,5F)',
  '[FF][05][58][00]': '(wait,58)',
  '[FF][05][5C][00]': '(wait,5C)',
  '[FF][05][5E][00]': '(wait,5E)',
  '[FF][05][60][00]': '(wait,60)',
  '[FF][05][64][00]': '(wait,64)',
  '[FF][05][6C][00]': '(wait,6C)',
  '[FF][05][5E][00]': '(wait,5E)',
  '[FF][05][E1][00]': '(wait,E1)',
  //done uhhh please really forgive me lord
  '[FF][06][00]': '(color,white)',
  '[FF][06][02]': '(color,blue)',
  '[FF][06][03]': '(color,purple)',
  '[FF][07]': '(name)',
//  '[FF][08]': '~Nickname~',
  '[FF][0E]': '(choice)',
//  '[FF][0F]': '~Lastname~',
  '[00]': ' ',
  '[31]': 'a',
  '[32]': 'b',
  '[33]': 'c',
  '[34]': 'd',
  '[35]': 'e',
  '[36]': 'f',
  '[37]': 'g',
  '[38]': 'h',
  '[39]': 'i',
  '[3A]': 'j',
  '[3B]': 'k',
  '[3C]': 'l',
  '[3D]': 'm',
  '[3E]': 'n',
  '[3F]': 'o',
  '[40]': 'p',
  '[41]': 'q',
  '[42]': 'r',
  '[43]': 's',
  '[44]': 't',
  '[45]': 'u',
  '[46]': 'v',
  '[47]': 'w',
  '[48]': 'x',
  '[49]': 'y',
  '[4A]': 'z',
  '[80][A6]': '[80]A',
  '[80][A7]': '[80]B',
  '[80][A8]': '[80]C',
  '[80][A9]': '[80]D',
  '[80][AA]': '[80]E',
  '[80][AB]': '[80]F',
  '[80][AC]': '[80]G',
  '[80][AD]': '[80]H',
  '[80][AE]': '[80]I',
  '[80][AF]': '[80]J',
  '[80][B0]': '[80]K',
  '[80][B1]': '[80]L',
  '[80][B2]': '[80]M',
  '[80][B3]': '[80]N',
  '[80][B4]': '[80]O',
  '[80][B5]': '[80]P',
  '[80][B6]': '[80]Q',
  '[80][B7]': '[80]R',
  '[80][B8]': '[80]S',
  '[80][B9]': '[80]T',
  '[80][BA]': '[80]U',
  '[80][BB]': '[80]V',
  '[80][BC]': '[80]W',
  '[80][BD]': '[80]X',
  '[80][BE]': '[80]Y',
  '[80][BF]': '[80]Z',
//  '[C0]': '0',
//  '[C1]': '1',
//  '[C2]': '2',
//  '[C3]': '3',
//  '[C4]': '4',
//  '[C5]': '5',
//  '[C6]': '6',
//  '[C7]': '7',
//  '[C8]': '8',
//  '[C9]': '9',
  '[80][D0]': "[80]?",
  '[80][D1]': "[80]!",
  '[61]': "'",
  '[65]': ',',
  '[68]': ':',
//  '[80][A5]': ".",
};

// Replace the exceptions
Object.entries(exceptions).forEach(([key, value]) => {
  formattedData = formattedData.split(key).join(value);
});

// Write the formatted data to <filename>output.txt
const outputFilename = `${filename.slice(0, -4)}output.txt`;
fs.writeFileSync(outputFilename, formattedData);

//Yay
console.log("Unpacking successful! You may now close this window.");