// Dependencies
import React from "react";

// Components
import { RgbaContainer } from "../styled";

const RgbaInput = ({ color, onChange }) => {
  return (
    <RgbaContainer>
      <input
        type="number"
        name="r"
        onChange={onChange}
        value={color.r}
        step="1"
        max={255}
        min={0}
      />
      <input
        type="number"
        name="g"
        onChange={onChange}
        value={color.g}
        step="1"
        max={255}
        min={0}
      />
      <input
        type="number"
        name="b"
        onChange={onChange}
        value={color.b}
        step="1"
        max={255}
        min={0}
      />
      <input
        type="number"
        name="a"
        onChange={onChange}
        value={color.a}
        step="0.1"
        max={1}
        min={0}
      />
    </RgbaContainer>
  );
};

export default RgbaInput;
