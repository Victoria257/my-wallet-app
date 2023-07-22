import Web3 from "web3";
import { useState } from "react";
import css from "./Form.module.css";

export const Form = ({ web3, connectedAddress }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const onSending = async (event) => {
    event.preventDefault();
    console.log("send");
    if (!web3) {
      console.error(
        "Гаманець недоступний. Переконайтеся, що ви підключені до гаманця."
      );
      return;
    }

    try {
      const amountInWei = web3.utils.toWei(amount.toString());

      await web3.eth.sendTransaction({
        to: address,
        from: connectedAddress,
        value: amountInWei,
      });

      alert("Платіж пройшов успішно");
      setAddress("");
      setAmount(0);
    } catch (error) {
      alert("Платіж не пройшов");
      console.error("Error sending tokens:", error);
    }
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
          placeholder="Enter the recipient's address"
          onChange={onChangeAddress}
          value={address}
        />
        <input
          className={css.input}
          placeholder="Enter the amount of tokens"
          onChange={onChangeAmount}
          value={amount}
        />
        <button className={css.button} type="submit" onClick={onSending}>
          Send tokens
        </button>
      </form>
    </div>
  );
};
