import * as React from "react";
import { useState } from "react";
import TextInput from "../text-input/text-input";

const COST_DEFAULT = 3300000;
const INITIAL_FEE_DEFAULT = 420000;
const LEASE_TERM_IN_MONTHS_DEFAULT = 60;

const Limit = {
  CostMin: 1500000,
  CostMax: 10000000,
  InitialFeePercentMin: 10,
  InitialFeePercentMax: 60,
  LeaseTermInMonthMin: 6,
  LeaseTermInMonthMax: 120,
} as const;

const Calculator = () => {
  const [cost, setCost] = useState(COST_DEFAULT);
  const [initialFee, setInitialFee] = useState(INITIAL_FEE_DEFAULT);
  const [leaseTermInMonths, setLeaseTermInMonths] = useState(LEASE_TERM_IN_MONTHS_DEFAULT);

  const handleFormSubmit = () => {
    const result = {
      cost,
      initialFee,
      leaseTermInMonths
    };

    alert(
      JSON.stringify(result)
    );
  };

  const monthlyPayment = Math.round((cost - initialFee) * (0.05 * Math.pow((1 + 0.05), leaseTermInMonths) / (Math.pow((1 + 0.05), leaseTermInMonths) - 1)));
  const leaseTotal = initialFee + leaseTermInMonths * monthlyPayment;

  return (
    <article className="calculator">
      <h1 className="visually-hidden">
        Калькулятор стоимости автомобиля в лизинг
      </h1>
      <p className="calculator__title">
        Рассчитайте стоимость автомобиля в лизинг
      </p>
      <form action="" className="calculator__form" onSubmit={handleFormSubmit}>
        <TextInput
          id="auto-cost-input"
          name="auto-cost"
          label="Стоимость автомобиля"
          value={cost}
          minValue={Limit.CostMin}
          maxValue={Limit.CostMax}
          text="₽"
          changeValue={setCost}
        />

        <TextInput
          id="initial-fee-input"
          name="initial-fee"
          label="Первоначальный взнос"
          value={initialFee}
          minValue={Limit.InitialFeePercentMin * cost / 100}
          maxValue={Limit.InitialFeePercentMax * cost / 100}
          text=""
          withPercent={true}
          relativeAmount={cost}
          currencySign="₽"
          changeValue={setInitialFee}
        />

        <TextInput
          id="lease-term-input"
          name="lease term"
          label="Срок лизинга"
          value={leaseTermInMonths}
          minValue={Limit.LeaseTermInMonthMin}
          maxValue={Limit.LeaseTermInMonthMax}
          text="мес."
          changeValue={setLeaseTermInMonths}
        />

        <div className="calculator__result">
          <p className="calculator__result-title">Сумма договора лизинга</p>
          <p className="calculator__result-value">{leaseTotal}</p>
        </div>

        <div className="calculator__result">
          <p className="calculator__result-title">Ежемесячный платеж от</p>
          <p className="calculator__result-value">{monthlyPayment}</p>
        </div>

        <button className="button calculator__button" type="submit">
          Оставить заявку
        </button>
      </form>
    </article>
  );
};

export default Calculator;
