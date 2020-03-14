// Sorts an array by score
const sortByScore = (arr) => {
    arr.sort((a, b) => b.score - a.score);
};

export { sortByScore };
