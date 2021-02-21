// Dependencies
import React, { useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { useDebounce } from "react-use";

const ColorPicker = ({ color, onChange }) => {
  const [value, setValue] = useState(color);

  useDebounce(() => onChange(value), 200, [value]);

  return <RgbaStringColorPicker color={color} onChange={setValue} />;
};

export default ColorPicker;
