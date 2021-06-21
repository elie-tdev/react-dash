export const opacity = (hex, opacity) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex', hex);
  }
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
    result[3],
    16,
  )}, ${opacity})`;
};

export const gradient = ({ type = 'linear', colors, background }) =>
  `${type}-gradient(${colors.join(', ')}), ${background};`;
