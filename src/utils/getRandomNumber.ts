/**
 * Generates a number between min and max.
 * @param {number} min
 * @param {number} max
 */

const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * max) + min;
};

export default getRandomNumber;
