// Dependencies
import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import {
  Label,
  InputDescription,
  InputErrors,
  InputText,
} from "strapi-helper-plugin";
import tinycolor from "tinycolor2";
import { useClickAway } from "react-use";

// Components
import Picker from "./ColorPicker";
import RgbaInput from "./RgbaInput";
import { ColorContainer, Color, PopOver } from "../styled";

// Hooks
import { useFirstRender } from "../../hooks/useFirstRender";

const defaultColor = {
  hex: "#000000ff",
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  css: "rgba(0, 0, 0, 1)",
};

const ColorPicker = ({
  inputDescription,
  errors,
  label,
  name,
  noErrorsDescription,
  onChange,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(
    props.value ? JSON.parse(props.value) : defaultColor
  );
  const [hex, setHex] = useState(() =>
    props.value ? JSON.parse(props.value).hex : "#000000"
  );
  const popoverRef = useRef(null);
  const firstRender = useFirstRender();

  /**
   * Handle click away from colorpicker popover
   */
  useClickAway(popoverRef, () => setShow(false));

  /**
   * Makes the color value available to the document for database update
   *
   * @param {string} color - as a stringified JSON
   */
  const updateColorValue = (value) => {
    onChange({ target: { name, value: JSON.stringify(value) } });
  };

  /**
   * Assign a default color value if the document doesn't have one yet
   */
  useEffect(() => {
    !props.value
      ? updateColorValue(defaultColor)
      : setColor(JSON.parse(props.value));
  }, [props.value]);

  /**
   * Handle color change complete to Strapi from the the color picker
   *
   * @param {string} color
   */
  const handleChange = (color) => {
    const newColor = {
      hex: tinycolor(color).toHex8String(),
      rgb: tinycolor(color).toRgb(),
      css: color,
    };

    setColor(newColor);
    setHex(tinycolor(color).toHexString());

    return updateColorValue(newColor);
  };

  /**
   * Handle the hexadecimal color change from input
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event from the input
   */
  const handleChangeHex = (e) => {
    const hexadecimal = e.target.value;

    const newColor = {
      hex: tinycolor(hexadecimal).toHex8String(),
      rgb: tinycolor(hexadecimal).toRgb(),
      css: tinycolor(hexadecimal).toRgbString(),
    };

    setColor(newColor);
    updateColorValue(newColor);

    return setHex(hexadecimal);
  };

  /**
   * Handle the rgba color change
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event from the input
   */
  const handleChangeRgba = (e) => {
    const rgb = { ...color.rgb, [e.target.name]: Number(e.target.value) };

    const newColor = {
      hex: tinycolor(rgb).toHex8String(),
      rgb: rgb,
      css: tinycolor(rgb).toRgbString(),
    };

    setColor(newColor);

    return updateColorValue(newColor);
  };

  const rgbaString = useMemo(() => {
    return color.css;
  }, [color]);

  let spacer = !isEmpty(inputDescription) ? (
    <div style={{ height: ".4rem" }} />
  ) : (
    <div />
  );

  if (!noErrorsDescription && !isEmpty(errors)) {
    spacer = <div />;
  }

  if (firstRender) return null;

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
        <Color $color={rgbaString} onClick={() => setShow(true)} />
        {show && (
          <PopOver ref={popoverRef}>
            <Picker color={rgbaString} onChange={handleChange} />

            <div style={{ marginTop: "-0.9rem", position: "relative" }}>
              {color.rgb.a !== 1 ? (
                <RgbaInput color={color.rgb} onChange={handleChangeRgba} />
              ) : (
                <InputText
                  onChange={handleChangeHex}
                  value={hex}
                  style={{
                    borderRadius: "0px 0px 8px 8px",
                  }}
                />
              )}
            </div>
          </PopOver>
        )}
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

export default React.memo(ColorPicker);
