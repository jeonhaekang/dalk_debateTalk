const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const fontWeight = {
  extraBold: 800,
  semiBold: 600,
  regular: 400,
};

const color = {};

const theme = {
  fontSizes,
  fontWeight,
  color,
  calcRem,
};

export default theme;
