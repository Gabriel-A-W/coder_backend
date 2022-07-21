
const cant = parseInt(process.argv[2]);
const rv = {}; 
const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};




for (let i = 0; i < cant; i++)
{
    const rn = getRandomInt(1, 1000);

    if (!rv[rn])
        rv[rn] = 0;

    rv[rn]++;
}

process.send(rv);