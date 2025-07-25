export function setColorVariables(mainColorGiven, darkModeValue = false) {
  function darkMode(value) {
    return darkModeValue ? 100 - value : value;
  }
  function darkModeAdjust(value, adjust = 100) {
    return darkModeValue ? value - adjust : value + adjust;
  }

  let mainColor = mainColorGiven ? mainColorGiven : "#effeff";
  // Get the hue of the main color
  const hue = hexToHue(mainColor);
  let colors = {
    background: `hsl(${hue}, 100%, ${darkMode(97)}%)`,
    text: `hsl(${hue}, 100%, ${darkMode(3)}%)`,
    "text-dark": `hsl(${hue}, 100%, ${darkMode(25)}%)`,
    "text-mid": `hsl(${hue}, 100%, ${darkMode(40)}%)`,
    "text-light": `hsl(${hue}, 100%, ${darkMode(65)}%)`,
    "background-greyer": `hsl(${hue}, 75%, ${darkMode(10)}%)`,
    "background-darker": `hsl(${hue}, 100%, ${darkMode(88)}%)`,
    "background-hover": `hsl(${hue}, 100%, ${darkMode(73)}%)`,
    "background-selected": `hsl(${hue}, 60%, ${darkMode(65)}%)`,
    "border-light": `hsl(${hue}, 100%, ${darkMode(40)}%)`,
    "border-mid": `hsl(${darkModeAdjust(hue, 10)}, 100%, ${darkMode(50)}%)`,
    "border-dark": `hsl(${hue}, 100%, ${darkMode(25)}%)`,
    "border-very-dark": `hsl(${hue}, 100%, ${darkMode(12)}%)`,
  };
  for (const [varName, color] of Object.entries(colors)) {
    document.documentElement.style.setProperty("--" + varName, color);
  }
}
/**
 * Convert a hex color to a hue value
 * Formula from https://www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/
 * @param {string} inputHex - The hex color to convert
 * @returns The hue value of the color
 */
function hexToHue(inputHex) {
  const hex = inputHex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;

  if (max === min) {
    // Achromatic
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }
  h /= 6;
  h = Math.round(360 * h);

  return h;
}
