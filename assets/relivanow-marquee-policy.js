/**
 * Resolve marquee duration without changing the native legacy formula.
 *
 * @param {object} options
 * @param {number} options.copyCount
 * @param {number} options.speedFactor
 * @param {string | null} [options.speedMode]
 * @param {number} [options.loopDistance]
 * @param {number} [options.secondsPer100]
 * @returns {number}
 */
export function calculateMarqueeDuration({
  copyCount,
  speedFactor,
  speedMode = null,
  loopDistance = 0,
  secondsPer100 = 0,
}) {
  if (speedMode === 'distance' && loopDistance > 0 && secondsPer100 > 0) {
    return (loopDistance / 100) * secondsPer100;
  }

  return Math.sqrt(copyCount) * speedFactor;
}

/**
 * Missing data keeps the native hover-pause behavior. Only an explicit false opts out.
 *
 * @param {string | null} attribute
 * @returns {boolean}
 */
export function shouldPauseOnHover(attribute) {
  return attribute !== 'false';
}
