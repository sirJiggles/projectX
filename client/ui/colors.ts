import Color from '../types/Color';

type Pallet = {
  darkContext: Color;
  dark: Color;
  light: Color;
  anyContext: Color;
  lightContext: Color;
};

const colors = {
  darkContext: {
    hex: '#ffba08',
    rgb: [255, 186, 8]
  },
  dark: {
    hex: '#171a21',
    rgb: [23, 26, 33]
  },
  light: {
    hex: '#f0eff4',
    rgb: [240, 239, 244]
  },
  anyContext: {
    hex: '#da4167',
    rgb: [218, 65, 103]
  },
  lightContext: {
    hex: '#832161',
    rgb: [131, 33, 97]
  }
} as Pallet;

export default colors;
