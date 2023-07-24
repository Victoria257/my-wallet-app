import React, { useState } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import css from "./ConnectWallet.module.css";
import { toast } from "react-hot-toast";

const ConnectWallet = ({
  setWeb3,
  connectedAddress,
  setConnectedAddress,
  balance,
  setBalance,
}) => {
  const connectWallet = async () => {
    const providerOptions = {
      metamask: {
        package: null,
      },
    };

    const web3Modal = new Web3Modal({
      network: "goerli", //тестова мережа
      // network: "mainnet", //реальна мережа
      // network: "sepolia",//тестова мережа
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
      toast.error(
        "The wallet is not available. Make sure you are connected to the wallet."
      );
    }
  };

  const visualBalance = balance.slice(0, 5);
  const visualAddress =
    connectedAddress.slice(0, 5) + "..." + connectedAddress.slice(-4);
  return (
    <div>
      <button
        className={
          connectedAddress ? `${css.activeButton} ${css.button}` : css.button
        }
        onClick={connectWallet}
      >
        {!connectedAddress
          ? "Connect Wallet"
          : `${visualBalance}     ${visualAddress}`}
      </button>
    </div>
  );
};

export default ConnectWallet;
