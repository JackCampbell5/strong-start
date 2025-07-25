export function setColorVariables(mainColorGiven) {
  let mainColor = mainColorGiven ? mainColorGiven : "#effeff";
  // Get the hue of the main color
  const hue = hexToHue(mainColor);
  let colors = {
    background: `hsl(${hue}, 100%, 97}%)`,
    text: `hsl(${hue}, 100%, 3}%)`,
    "text-dark": `hsl(${hue}, 100%, 25}%)`,
    "text-mid": `hsl(${hue}, 100%, 40}%)`,
    "text-light": `hsl(${hue}, 100%, 65}%)`,
    "background-greyer": `hsl(${hue}, 75%, 10}%)`,
    "background-darker": `hsl(${hue}, 100%, 88}%)`,
    "background-hover": `hsl(${hue}, 100%, 73}%)`,
    "background-selected": `hsl(${hue}, 60%, 65}%)`,
    "border-light": `hsl(${hue}, 100%, 40}%)`,
    "border-mid": `${hue}, 10)}, 100%, 50}%)`,
    "border-dark": `hsl(${hue}, 100%, 25}%)`,
    "border-very-dark": `hsl(${hue}, 100%, 12}%)`,
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
    return 0;
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
