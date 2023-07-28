import React, { useState, useEffect } from "react";
import Web3 from "web3";
import css from "./ConnectWallet.module.css";
import { toast } from "react-hot-toast";
import detectEthereumProvider from "@metamask/detect-provider";
import { checkBalance } from "../../checkBalance";

const ConnectWallet = ({
  setWeb3,
  connectedAddress,
  setConnectedAddress,
  balance,
  setBalance,
  metaMaskSDK,
  setMetaMaskSDK,
  isMobile,
  setIsMobile,
}) => {
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice =
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1;
      setIsMobile(isMobileDevice);
    };

    checkIsMobile();
  }, []);

  useEffect(() => {
    if (isMobile) {
      const initMetaMaskSDK = async () => {
        try {
          const MetaMaskSDK = await import("@metamask/sdk");
          const options = {};
          const MMSDK = new MetaMaskSDK.MetaMaskSDK(options);
          setMetaMaskSDK(MMSDK);
        } catch (error) {
          console.error("Помилка ініціалізації MetaMask SDK:", error);
        }
      };
      initMetaMaskSDK();
    }
  }, [isMobile]);

  const connectWallet = async () => {
    if (isMobile) {
      if (!metaMaskSDK) {
        toast.error("Failed to connect.");
        return;
      }

      const ethereum = metaMaskSDK.getProvider();

      const web3Instance = new Web3(ethereum);
      setWeb3(web3Instance);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const selectedAddress = accounts[0];

        setConnectedAddress(selectedAddress);

        checkBalance({ setBalance, selectedAddress });
      } catch (error) {
        toast.error("Failed to connect.");
      }
    } else {
      // Підключення на комп'ютері за допомогою detectEthereumProvider
      const provider = await detectEthereumProvider({ silent: true });
      if (!provider) {
        toast.error(
          "MetaMask is not installed or not available. Please install it to connect."
        );
        return;
      }

      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      try {
        const accounts = await web3Instance.eth.getAccounts();
        setConnectedAddress(accounts[0]);

        const localBalance = await web3Instance.eth.getBalance(accounts[0]);
        setBalance(web3Instance.utils.fromWei(localBalance, "ether"));
      } catch (error) {
        toast.error(
          "MetaMask is not installed or not available. Please install it to connect."
        );
      }
    }
  };

  const visualBalance = balance ? balance.slice(0, 5) : "";
  const visualAddress = connectedAddress
    ? connectedAddress.slice(0, 5) + "..." + connectedAddress.slice(-4)
    : "";

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
