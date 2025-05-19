# Structure of a E Bin File

## Start of file
List of `uint16` pointers to each section. Needs to be multiplied by `0x800 ` to get the correct offset.

Size can only be determined by running through the values until you read zero.

C# Pseudocode
```cs
List<long> sectionPointers = new List<long>();
while (true)
{
  ushort val = ReadUInt16();
  if (val == 0) break;
  sectionPointers.Add(val * 0x800);
}
```

## Section
+ `section size` equals `sectionPointers[currentSection + 1] - sectionPointers[currentSection]`
+ Or if it's the last section, `fileSize - sectionPointers[currentSection]`

### Header
+ Most data unknown
+ always starts with `08 00 10 80`
+ `10 80` is a recurring theme, often comes after suspected uin16s
### Metadata?
+ Starts at `sectionpointer + 0x1F8`
+ Size of `0xED0` bytes
+ Thus Ends at `sectionpointer + 0x10C8`
+ Filled with FF, 0A, 00 bytes

### Opcode/Instructions/Text Etc
+ Starts at `sectionpointer + 0x10C8`
+ Ends at `sectionpointer + sectionsize`
+ Filled with instructions and text, see readme.md for more info
