export function setColorVariables(mainColor, darkMode = false) {
  // --background: #effeff;
  // --text: #00292c;
  // --text-dark: #00747d;
  // --text-mid: #00c2d0;
  // --text-light: #51f3ff;
  // --background-greyer: #c2cecf;
  // --background-darker: #c4faff;
  // --background-hover: #77f4ff;
  // --background-selected: #84c2c8;
  // --border-light: #00c1d3;
  // --border-mid: #0098f7;
  // --border-dark: #007e87;
  // --border-very-dark: #003b3f;
  // Get the hue of the main color
  const hue = hexToHue(mainColor);
  console.log("Hue: " + hue);
  let colors = {
    background: "#effeff",
    text: "#00292c",
    "text-dark": "#00747d",
    "text-mid": "#00c2d0",
    "text-light": "#51f3ff",
    "background-greyer": "#c2cecf",
    "background-darker": "#c4faff",
    "background-hover": "#77f4ff",
    "background-selected": "#84c2c8",
    "border-light": "#00c1d3",
    "border-mid": "#0098f7",
    "border-dark": "#007e87",
    "border-very-dark": "#003b3f",
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
