import { useState } from "react";
import css from "./Form.module.css";
export const Form = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const onSending = (event) => {
    event.preventDefault();
    console.log("send");
  };

  const onChangeAddress = (event) => {
    console.log(event.target.value);
    setAddress(event.target.value);
  };

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={css.container}>
      <form className={css.form}>
        <input
          className={css.input}
          placeholder="Адреса одержувача"
          onChange={onChangeAddress}
        />
        <input
          className={css.input}
          placeholder="Кількість токенів"
          onChange={onChangeAmount}
        />
        <button type="submit" onClick={onSending}>
          Відправити токени
        </button>
      </form>
    </div>
  );
};
