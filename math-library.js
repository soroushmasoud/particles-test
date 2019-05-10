// Math Functions

Math.randomDec = function(low, high) {
    // return random decimal between low and high
    return Math.random() * (high - low) + low;
}

Math.randomInt = function(low, high) {
    return Math.floor(Math.randomDec(low, high));
}

Math.roundTo = function(num, numPlaces) {
    // round num off to nearest numPlaces
    num = num * 10 ** numPlaces;
    num = Math.round(num);
    return num / 10 ** numPlaces;
}

Math.randomElement = function(anArray) {
    // randomly select and return an element from anArray
    return anArray[Math.randomInt(0, anArray.length)];
}