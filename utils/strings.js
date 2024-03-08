const makeSearchRegex = (string) => {
    let arr = string.split(" ");
    let arr2 = arr.map((x) => {
        return `(?=^.*?${x}.*$)`;
    });
    arr2.push("^.*$");
    let st = arr2.join("");
    let r = new RegExp(st, "gi");
    return r;
};

module.exports = {
    makeSearchRegex,
};
