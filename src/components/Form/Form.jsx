import Web3 from "web3";
import { useState } from "react";
import css from "./Form.module.css";

export const Form = ({ web3, connectedAddress }) => {
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

    setLoading(true);
    const addressRegex = /^0x([0-9A-Fa-f]{40})$/;
    const validAddress = web3.utils.isAddress(address);
    const checksumAddress = addressRegex.test(address);

    const amountRegex = /^\d+\.\d+$/;
    const validAmount = amountRegex.test(amount);

    try {
      if (!validAmount) {
        alert("введіть число використовуючи крапку як роздільник");
        return;
      } else if (!validAddress || !checksumAddress) {
        alert("wrong address");
        return;
      } else {
        const amountInWei = web3.utils.toWei(amount.toString());

        await web3.eth.sendTransaction({
          to: address,
          from: connectedAddress,
          value: amountInWei,
        });

        alert("Платіж пройшов успішно");
        // setAddress("");
        // setAmount("");
        window.location.reload();
      }
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
