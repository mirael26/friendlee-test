import * as React from "react";
import TextInput from "../text-input/text-input";

const Calculator = () => {
  return (
    <article className="calculator">
      <h1 className="visually-hidden">
        Калькулятор стоимости автомобиля в лизинг
      </h1>
      <p className="calculator__title">
        Рассчитайте стоимость автомобиля в лизинг
      </p>
      <form action="" className="calculator__form">
        <TextInput
          id="auto-cost-input"
          name="auto-cost"
          label="Стоимость автомобиля"
          value="3300000"
          text="₽"
        />

        <TextInput
          id="initial-fee-input"
          name="initial-fee"
          label="Первоначальный взнос"
          value="420000"
          text="13%"
          textStyle="bordered"
          currencySign="₽"
        />

        <TextInput
          id="lease-term-input"
          name="lease term"
          label="Срок лизинга"
          value="60"
          text="мес"
        />

        <div className="calculator__result">
          <p className="calculator__result-title">Сумма договора лизинга</p>
          <p className="calculator__result-value">4 467 313</p>
        </div>

        <div className="calculator__result">
          <p className="calculator__result-title">Ежемесячный платеж от</p>
          <p className="calculator__result-value">114 455</p>
        </div>

        <button className="button calculator__button" type="submit">
          Оставить заявку
        </button>
      </form>
    </article>
  );
};

export default Calculator;
