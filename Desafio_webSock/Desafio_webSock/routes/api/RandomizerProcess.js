const cant = parseInt(process.argv[1]);
const rv = {};
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
for (let i = 0; i < cant; i++) {
    const rn = getRandomInt(1, 1000);
    if (!rv[rn])
        rv[rn] = 0;
    rv[rn]++;
}
process.send(rv);
//# sourceMappingURL=RandomizerProcess.js.map