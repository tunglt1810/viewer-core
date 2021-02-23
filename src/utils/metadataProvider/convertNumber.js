// Author: Triet Cao
// Date: 23/02/2020
// Attempt to covnert string input to number, if input is undefined or null, skip converting

export default (input) => {
    if (typeof (input) === 'undefined' || input === null) return input;
    else if (!isNaN(input)) return parseFloat(input);
    return undefined;
};
