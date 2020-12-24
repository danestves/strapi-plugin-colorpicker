// Dependencies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChromePicker, Color, ColorResult } from "react-color";
import styled from "styled-components";
import isEmpty from "lodash.isempty";
import { Label, InputDescription, InputErrors } from "strapi-helper-plugin";

const ColorContainer = styled.div`
  width: 8rem;
  height: 3.4rem;
  margin-top: 0.9rem;
  padding: 0.375rem 0.5rem;
  border: 1px solid #e3e9f3;
  border-radius: 0.25rem;
`;
const ColorSquare = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 0.25rem;
  transition: all 0.3s ease-in-out;
`;
const PopOver = styled.div`
  position: absolute;
  z-index: 2;
  top: 70px;
`;
const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ColorPicker = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  value,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState(
    value
      ? JSON.parse(value)
      : {
          hex: "#000000ff",
          rgb: {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          },
          css: "rgba(0,0,0,1)",
        }
  );

  let spacer = !isEmpty(inputDescription) ? (
    <div style={{ height: ".4rem" }} />
  ) : (
    <div />
  );

  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div />;
  }

  /**
   * Assign a default color value if the document doesn't have one yet
   */
  useEffect(() => {
    if (!value) {
      updateColorValue(color);
    } else {
      setColor(JSON.parse(value));
    }
  }, [value]);

  /**
   * Makes the color value available to the document for database update
   * @param {Color} colorValue - in hex format
   */
  const updateColorValue = (colorValue) => {
    const newColor = {
      hex: colorValue.hex,
      rgb: colorValue.rgb,
      css: `rgba(${Object.values(colorValue.rgb).join(",")})`,
    };

    onChange({ target: { name, value: JSON.stringify(newColor) } });
  };

  /**
   * Returns an hexadecimal color including alpha
   *
   * @param {number} alpha
   */
  const decimalToHex = (alpha) => {
    return alpha === 0 ? "00" : Math.round(255 * alpha).toString(16);
  };

  /**
   *
   * @param {ColorResult} color
   */
  const handleHexadecimalAlpha = (color) => {
    return `${color.hex}${decimalToHex(color.rgb.a)}`;
  };

  /**
   * Handle color change from the the color picker
   *
   * @param {Color} color
   */
  const handleChange = (color) => {
    setColor({
      ...color,
      hex: handleHexadecimalAlpha(color),
    });
  };

  /**
   * Handle color change complete to Strapi from the the color picker
   *
   * @param {Color} color
   */
  const handleChangeComplete = (color) => {
    updateColorValue({
      ...color,
      hex: handleHexadecimalAlpha(color),
    });
  };

  return (
    <div
      style={{
        marginBottom: "1.6rem",
        fontSize: "1.3rem",
        fontFamily: "Lato",
      }}
    >
      <Label htmlFor={name} message={label} />
      <ColorContainer>
        <ColorSquare color={color.hex} onClick={() => setShowPicker(true)} />
      </ColorContainer>
      <InputDescription
        message={inputDescription}
        style={!isEmpty(inputDescription) ? { marginTop: "1.4rem" } : {}}
      />
      <InputErrors
        errors={(!noErrorsDescription && errors) || []}
        name={name}
      />
      {spacer}
      {showPicker ? (
        <PopOver>
          <Cover onClick={() => setShowPicker(false)} />
          <ChromePicker
            color={color.hex}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
          />
        </PopOver>
      ) : null}
    </div>
  );
};

ColorPicker.defaultProps = {
  errors: [],
  label: "",
  noErrorsDescription: false,
};

ColorPicker.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default ColorPicker;
