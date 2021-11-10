module.exports = {
    // function from: https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
    genRandHex: size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
};