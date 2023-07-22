import React, { useState } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import css from "./ConnectWallet.module.css";

const ConnectWallet = ({
  web3,
  setWeb3,
  connectedAddress,
  setConnectedAddress,
}) => {
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    const providerOptions = {
      metamask: {
        package: null,
      },
    };

    const web3Modal = new Web3Modal({
      //   network: "goerli", //тестова мережа Goerli
      // network: "mainnet", //реальна мережа
      network: "sepolia",
      cacheProvider: true,
      providerOptions,
    });

    try {
      const provider = await web3Modal.connect();
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      setConnectedAddress(accounts[0]);

      const balance = await web3Instance.eth.getBalance(accounts[0]);
      setBalance(web3Instance.utils.fromWei(balance, "ether"));
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      {connectedAddress ? (
        <div className={css.container}>
          <p className={css.address}>{connectedAddress}</p>
          <p className={css.balance}>Balance: {balance} ETH</p>
        </div>
      ) : (
        <button className={css.button} onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
