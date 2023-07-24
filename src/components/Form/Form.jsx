import css from "./Form.module.css";

import { useState } from "react";
import { toast } from "react-hot-toast";

export const Form = ({ web3, connectedAddress, balance, setBalance }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const onSending = async (event) => {
    event.preventDefault();
    if (!web3) {
      toast.error(
        "The wallet is not available. Make sure you are connected to the wallet."
      );
      return;
    }
    const amountWithDot = amount.replace(",", ".");

    const addressRegex = /^0x([0-9A-Fa-f]{40})$/;
    const validAddress = web3.utils.isAddress(address);
    const checksumAddress = addressRegex.test(address);
    const amountRegex = /^\d+(\.\d+)?$/;

    const validAmount = amountRegex.test(amountWithDot);

    if (!validAddress || !checksumAddress) {
      toast.error("Wrong address!");

      return;
    }

    if (!validAmount) {
      toast.error("Invalid amount. Enter a whole or fractional number.");

      return;
    }

    if (amountWithDot < 0.000001 || amountWithDot > 100000) {
      toast.error(
        "Unacceptable amount. The amount must be in the range from 0.000001 to 100000."
      );
      return;
    }

    if (amountWithDot > 0 && amountWithDot % 10 === 0) {
      toast.error("Unacceptable amount. Integers cannot be multiples of 10.");

      return;
    }

    if (amountWithDot > balance) {
      toast.error("There are not enough tokens in the account.");
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
      toast.success("The payment was successful!");

      const updatedBalance = await web3.eth.getBalance(connectedAddress);
      setBalance(web3.utils.fromWei(updatedBalance, "ether"));

      setAmount("");
      setAddress("");
    } catch (error) {
      toast.error("Error sending tokens!");
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
