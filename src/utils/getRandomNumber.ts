/**
 * Generates a number between min and max.
 * @param {number} min
 * @param {number} max
 */
export default (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};
