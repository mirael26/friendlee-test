import * as React from "react";
import { useEffect, useRef } from "react";

interface IRangePickerProps {
  value: number;
  minValue: number;
  maxValue: number;
  changeValue: (newValue: number) => void;
}

const RangePicker = (props: IRangePickerProps) => {
  const { value, minValue, maxValue, changeValue } = props;

  const picker = useRef(null);
  const line = useRef(null);
  const activeLine = useRef(null);

  useEffect(() => {
    const totalValue = maxValue - minValue;
    const pickerWidth = picker.current.clientWidth;
    const total = line.current.clientWidth - pickerWidth;

    const pickerPosition = ((value - minValue) / totalValue) * total;
    picker.current.style.left = `${pickerPosition}px`;
    activeLine.current.style.width = `${pickerPosition}px`;
  }, [value, minValue, maxValue]);

  const onMouseDown = (downEvt: React.MouseEvent) => {
    downEvt.preventDefault();
    const pickerWidth = picker.current.clientWidth;
    const total = line.current.clientWidth - pickerWidth;
    const startCoords = downEvt.clientX;

    const onMouseMove = (moveEvt: MouseEvent) => {
      moveEvt.preventDefault();
      let shift = startCoords - moveEvt.clientX;
      const shiftValue = Math.round((shift / total) * (maxValue - minValue));
      const newValue = value - shiftValue;

      if (newValue < minValue) {
        changeValue(minValue);
      } else if (newValue > maxValue) {
        changeValue(maxValue);
      } else {
        changeValue(newValue);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="range-picker">
      <div
        className="range-picker__picker"
        ref={picker}
        onMouseDown={onMouseDown}
      ></div>

      <div className="range-picker__active-line" ref={activeLine}></div>
      <div className="range-picker__line" ref={line}></div>
    </div>
  );
};

export default RangePicker;
