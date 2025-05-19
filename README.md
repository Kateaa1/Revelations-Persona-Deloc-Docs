# Revelations-Persona-Text-Editing
A  write up about how to edit Persona 1 text, and some other oddities of its internals.


To start i want to get some credits out of the way, as a disclaimer

## Disclaimer: I DID NOT discover 99.99% of this myself, it was the efforts of others much smarter than myself and they are credited below. I am just writing this up

# also there's gonna be typos i wrote this at like 12am

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Credits:

**LopoDoesThings**: He literally did most of the reverse engineering and editing for the Deloc

**Quantum-Dog**: Helped A TON and despite our differences and arguments, he pulled the group together

**Miimin**: Helped a lot with the more Japanese-centric things

**Qlonever**: Helped Lopo with some more of the tricky reverse engineering stuff

**Fothsid**: The hacker for Tom's patch, told me some info in the romhacking.net discord (namely the VDP1 Memory and compression stuff)

**Morgana-X**: Added ebin_structure.md and persona_ps1_ebin.bt as well as other information

**The original developers and localizers from ATLUS**

**And everyone else who contributed to the discussion in the Classic Persona Modding server during 2022 and 2023, too many names to list but you're all great**

Okay, lets get into this.

## First, the various versions of Persona 1

There's 3 main versions of the game, as you should know


The Original PS1 Release of the game, titled **Megami Ibunroku Persona**

The English PS1 Release, titled **Revelations: Persona**

The PSP Release, titled **Persona** or **Shin Megami Tensei Persona** depending on region

This writeup will cover *exclusively* the PS1 releases, I do not know enough about how PSP works aside from music and FMVs

...And before someone mentions the PC port, it is 99% the same as the Japanese PS1 version.

## How does Persona 1's text work?

First, a disclaimer

!!!I do not know how to edit the text found in the executable nor anything outside the E*.bin files!!!

Persona 1 uses a custom scripting language for it's text, as well as a custom encoding, loosely based on Shift-JIS for the JP text and ASCII for the ENG text found in Revelations.

These files are located in the ADV directory and are labeled: E0.BIN, E1.BIN, E2.BIN, E3.BIN

In **Revelations** the E0 and E2 binaries contain the *English text* whereas the E1 and E3 files contain *untranslated Snow Queen Quest text*

These files contain the text during the **isometric gameplay** sections, **dungeons**, **isometric cutscenes** and text on the **world map**  

If you open the files in a hex editor you'll see a few main things

1. Control Code, I don't fully understand most of this myself tbh, but it controls when the game loads the text below it, as well as how long that scene should be and a few other things

2. The actual text, this is well...what the game renders to the screen, pretty self explanitory

3. Commands, these get their own section below in the **editing text** part of the writeup, they control things like when to wait for the player to press a button, newlines, and some other stuffs.

Text is, confusingly rendered to VDP1 memory, which is *wrong*, VDP1 is usually for more intensive effects and models, not for simple text, this is not the only oddity about the game (This information came from Fothsid)

This article about the Sega Saturn's implimentation explains more: https://segaretro.org/Sega_Saturn/Hardware_comparison

The game's font is quite large, because of this you can only have 30 characters per text box before clearing it or using [FF 04], if a line is **exactly 30 characters long** then the game will automatically insert a newline (yay)
not doing so will lead to a crash, text not being rendered, or text not being rendered correctly

There seems to be 2 encodings for different language text, mainly because there are 2 ways to input a period, [75] and [80 A5]

The game expects the E*.BINs to be roughly a certain size (although I'm not sure exactly of the limits I do know replacing every [80 A5] with [75] will crash the game) if they aren't then the game will crash during boot


## How to edit text

Lemme begin this with **doing all this in a hex editor is a waste of time, however I do not have any tools to edit it better**

Step 1. From your extracted copy of the game go to the ADV folder and find the E*.BIN files

Step 2. Open these in whatever hex editor you like (unless its Ghex, it doesn't support tbl and csv files)

Step 3. Download the .tbl or .csv linked to this repo and use those to edit text :D 

Ofc it is not just that, but it is pretty simple all things considered

I highly recommend using 010 Editor or something that can show you the letters instead of needing to have the .tbl open constantly, makes it all much more chill 

Okay so, you've started editing and then you see a random slab of bytes in the middle of your text, these are **commands** the begin with FF, then a number and maybe some more numbers after, here is what they mean!

FF 01 = Close Text Box

FF 02 = Wait for user input

FF 03 = Newline

FF 04 = Clear Text Box

FF 05 XX XX = Pause Text for XX XX Frames

FF 06 XX = Change Font Color 

FF 07 = Player's Name

FF 0E = display a choice box in dialogue. **It has no custom values which means you can't edit what the choices say**, just call them.

for [FF 06] the colors are such: 

**00** = White

**02** = Blue

**03** = Purple (I think this just blocks the text, so you can use it to censor stuff ig???)

**01** = Yellow (This is never used in game, likely a hold-over from Devil Summoner, however it does appear in the Japanese manual)

***Make sure you set the text back to white because it does not revert automatically***

For certain charcters mainly puncuation and *capital letters* you need to insert [80] before them or else they will not render correctly

Colons, and periods need to have their hex value entered

**Colon** = [68]

**Period** = [75] OR [80 A5] (these function the same in game, its just the amount of space they take up)

Feel free to replace large amounts of [80 A5] with [75] if you're tight on space 

Its HIGHLY recommended to call [FF 02] before [FF 04] while it doesn't hurt the functionality of the game it feels better for the player!

The values for [FF 0E] are contained somewhere else in the game, if its the same as PSP likely in the executable itself, which is a massive pain :(

## Using KateTool

KateTool is 3 JavaScript Scripts that let you convert the game's text files into .txt and back again, as well as count to make sure you don't go over the 30 byte-per-line limits

The tool works on Windows and Linux (on Linux just check the game's ADV folder for the output), and the code is in the repo, you will need node.js to run it.


## Editing Japanese Text

# UNDER CONSTRUCTION, WILL ADD LATER I HOPE



 



