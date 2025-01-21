const { renameVariables, renameFunctions, randomString, renameProperties } = require("./src/rename names.js");
const { addUselessFunctions } = require("./src/random code.js");
const { createAliases } = require("./src/builtin func aliases.js");
const { encodeStrings } = require("./src/encode strings.js");
const { encodeNumbers } = require("./src/encode numbers.js");
const fs = require("fs");

let inputCode;
const args = process.argv.slice(2);
fs.readFile(args[0], "utf8", (err, contents) => {
    if (err) {
        console.log(`Error reading file: ${err}`);
        return;
    }

    const trueName = randomString(24);
    const falseName = randomString(24);
    const getfenvName = randomString(24);

    inputCode = `${contents};${addUselessFunctions(addUselessFunctions(addUselessFunctions(addUselessFunctions(" "))))}`; // probably add more
    inputCode = inputCode.replace(/(?<=[^:])--.*|^--.*/g, "").trim();
    inputCode = inputCode.replace(/\btrue\b/g, `(not ${falseName})`).replace(/\bfalse\b/g, `(not ${trueName})`);
    inputCode = `local ${falseName}=(not true);local ${trueName}=(not false);` + inputCode;

    inputCode = renameFunctions(inputCode, 24);
    inputCode = addUselessFunctions(inputCode, 1);

    inputCode = renameVariables(inputCode, 30);
    inputCode = createAliases(inputCode, getfenvName);
    inputCode = encodeStrings(inputCode);
    inputCode = encodeNumbers(inputCode);
    inputCode = renameProperties(inputCode);

    inputCode = inputCode.replace(" = ", "=").replace(" == ", "==").replace(" ~= ", "~=").replace(" < ", "<").replace(" > ", ">").replace(" <= ", "<=").replace(" >= ", ">=").replace(" + ", "+").replace(" - ", "-").replace(" * ", "*").replace(" ^ ", "^").replace(" .. ", "..").replace(" / ", "/").replace(", ", ",");
    inputCode = inputCode.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
    inputCode = `return(function(...)([[ Script obfuscated by luascator ]]):gsub('.+',(function(iwjdnaisn)local ${randomString(20)}=iwjdnaisn.."discord.gg/WgAcTZzStB 🤫";end));do local ${getfenvName}=getfenv;${inputCode};end([[ "Good luck deobfuscating that" - luascator's creator ]]):gsub('.+',(function(hajwdhjs)local ${randomString(20)}=hajwdhjs.."you thought LMAO";end));end)(...)`;
    //console.log(inputCode);

    fs.writeFile("./obfuscated.luau", inputCode, (err) => {
        if (err) {
            console.log(`Error saving obfuscated script: ${err}`);
        } else {
            console.log("Saved obfuscated script.");
        }
    });
})