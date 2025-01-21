function randomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";

    let newStr = "";
    for (let i = 0; i < length; i++) {
        newStr += chars.charAt(Math.floor(Math.random() * chars.length));
    };

    return newStr;
};

function randomGoofyAhhString() {
    const strings = [
        `"If her booty doesn't bounce.... the end of the relationship you shall announce" - a wise man`,
        "what the fuck you watching here?",
        `"no pen, no paper... but, you still draw my attention"- a rizzler`,
        "racism is evil",
        "oil up lil bro",
        `"you are a pointer to my heart" - a nerd rizz`
    ];

    return strings[Math.floor(Math.random() * strings.length)];
}

function renameVariables(code, length) {
    const vNames = [];

    code = code.replace(/local (\w+)/g, (match, vName) => {
        if (vName == "function") {
            return "local function";
        }

        const randomVarName = randomString(length);
        vNames.push({ oldName: vName, newName: randomVarName });

        return `local ${randomVarName}`;
    });

    vNames.forEach(({ oldName, newName }) => {
        code = code.replace(new RegExp(`\\b(?!['"])(?<!['"])${oldName}(?!['"])(?<!['"])\\b`, "g"), newName);
    })

    return code;
};

function renameFunctions(code, length) {
    const fNames = [];

    code = code.replace(/function\s+(\w+)/, (match, fName) => {
        const randomVarName = randomString(length);
        fNames.push({ oldName: fName, newName: randomVarName });

        return `function ${randomVarName}`;
    });

    fNames.forEach(({ oldName, newName }) => {
        code = code.replace(new RegExp(`\\b(?!['"])(?<!['"])${oldName}(?!['"])(?<!['"])\\b`, "g"), newName);
    })

    return code;
}

function renameProperties(code) {
    code = code.replace(/(?<!['"])(\b\w+)\.(\w+)(?!['"])/g, (_, object, property) => {
        if (/\d/.test(object)) { return `${object}.${property}` };

        return `${object}[(${property.toString().split('').map(char => `string.char(${char.charCodeAt(0)})`).join("..")})]`;
    })

    return code;
}

module.exports = { renameVariables, renameFunctions, randomString, renameProperties, randomGoofyAhhString };