import Web3 from "web3";

import css from "./Form.module.css";

import { useState } from "react";

export const Form = ({ web3, connectedAddress, balance, setBalance }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const onSending = async (event) => {
    event.preventDefault();
    if (!web3) {
      alert(
        "Гаманець недоступний. Переконайтеся, що ви підключені до гаманця."
      );
      return;
    }
    const amountWithDot = amount.replace(",", ".");

    const addressRegex = /^0x([0-9A-Fa-f]{40})$/;
    const validAddress = web3.utils.isAddress(address);
    const checksumAddress = addressRegex.test(address);
    const amountRegex = /^\d+(\.\d+)?$/;

    const validAmount = amountRegex.test(amountWithDot);

    if (!validAmount) {
      alert("Неприпустима сума.введіть ціле або дробне число");

      return;
    }

    if (amountWithDot < 0.000001 || amountWithDot > 100000) {
      alert(
        "Неприпустима сума. Сума повинна бути в діапазоні від 0.000001 до 100000 ."
      );
      return;
    }

    if (amountWithDot > 0 && amountWithDot % 10 === 0) {
      alert("Неприпустима сума. Цілі числа не можуть бути кратними 10.");
      return;
    }

    if (amountWithDot > balance) {
      alert("Недостатньо токенів на рахунку");
      return;
    }
    if (!validAddress || !checksumAddress) {
      alert("wrong address");

      return;
    }
    try {
      setLoading(true);

      const amountInWei = web3.utils.toWei(amountWithDot.toString());
      await web3.eth.sendTransaction({
        to: address,
        from: connectedAddress,
        value: amountInWei,
      });

      alert("Платіж пройшов успішно");

      const updatedBalance = await web3.eth.getBalance(connectedAddress);
      setBalance(web3.utils.fromWei(updatedBalance, "ether"));

      setAmount("");
      setAddress("");
    } catch (error) {
      alert("Платіж не пройшов");
      console.error("Error sending tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
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
        <button
          className={css.button}
          type="submit"
          onClick={onSending}
          disabled={loading}
        >
          {loading ? "Loading..." : "Send tokens"}
        </button>
      </form>
    </div>
  );
};
