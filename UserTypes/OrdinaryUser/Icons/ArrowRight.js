import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ArrowRight = ({ color = 'currentColor', width = 24, height = 24 }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={width}
      height={height}
    >
      <Path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
    </Svg>
  );
};

export default ArrowRight;
