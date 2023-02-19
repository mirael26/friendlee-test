import * as React from "react";
import { useState, useEffect } from "react";
import { addPriceSeparators } from "../../utils";
import RangePicker from "../range-picker/range-picker";

interface ITextInputProps {
  id: string;
  name: string;
  type?: "text" | "number" | "email" | "address";
  label?: string;
  value?: number;
  minValue: number;
  maxValue: number;
  text?: string;
  withPercent?: boolean;
  relativeAmount?: number;
  currencySign?: string;
  changeValue: (newValue: number) => void;
}

const TextInput = (props: ITextInputProps) => {
  const {
    id,
    name,
    type = "text",
    label = null,
    value = props.minValue,
    minValue,
    maxValue,
    text = null,
    withPercent = false,
    relativeAmount,
    currencySign = null,
    changeValue,
  } = props;

  const [inputedValue, setInputedValue] = useState(null);

  useEffect(() => {
    if (value < minValue) {
      changeValue(minValue);
    } else if (value > maxValue) {
      changeValue(maxValue);
    }
  }, [minValue, maxValue]);

  useEffect(() => {
    setInputedValue(value);
  }, [value]);

  const handleInputBlur = () => {
    if (inputedValue < minValue) {
      changeValue(minValue);
    } else if (inputedValue > maxValue) {
      changeValue(maxValue);
    } else {
      changeValue(inputedValue);
    }
  };

  const currencySignText = currencySign ? ` ${currencySign}` : "";
  const textStyleClass = withPercent ? ` text-input__text--bordered` : "";
  const percent =
    relativeAmount && withPercent
      ? Math.round((value / relativeAmount) * 100)
      : null;
  const isText = text || percent;

  return (
    <div className="text-input">
      {label && (
        <label className="text-input__label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="text-input__wrapper">
        <input
          className="text-input__input"
          id={id}
          name={name}
          value={addPriceSeparators(inputedValue) + currencySignText}
          type={type}
          onChange={(evt) =>
            setInputedValue(+evt.target.value.replace(/[^0-9]/g, ""))
          }
          onBlur={handleInputBlur}
        />

        {isText && (
          <span className={"text-input__text" + textStyleClass}>
            {percent ? percent + " %" : text}
          </span>
        )}

        <div className="text-input__range">
          <RangePicker
            value={value}
            minValue={minValue}
            maxValue={maxValue}
            changeValue={changeValue}
          />
        </div>
      </div>
    </div>
  );
};

export default TextInput;
