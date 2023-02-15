import * as React from 'react';
import { addPriceSeparators } from '../../utils';

interface ITextInputProps {
  id: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'address';
  label?: string;
  value?: string;
  text?: string;
  textStyle?: 'bordered';
  currencySign?: string;
}

const TextInput = (props: ITextInputProps) => {
  const {
    id,
    name,
    type = 'text',
    label = null,
    value = '',
    text = null,
    textStyle = null,
    currencySign = null,
  } = props;

  const currencySignText = currencySign ? ` ${currencySign}` : '';

  return (
    <div className="text-input">
      {label && <label className="text-input__label" htmlFor={id}>{label}</label>}

      <div className="text-input__wrapper">
        <input className="text-input__input" id={id} name={name} value={addPriceSeparators(+value) + currencySignText} type={type}/>
        {text && <span className={`text-input__text${textStyle ? ` text-input__text--${textStyle}` : ''}`}>{text}</span>}

        <div className="text-input__range">
          <div className="text-input__range-picker"></div>
          <div className="text-input__range-active-line"></div>
          <div className="text-input__range-line"></div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
