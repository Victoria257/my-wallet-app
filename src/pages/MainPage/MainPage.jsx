import { useState } from "react";
import ConnectWallet from "../../components/ConnectWallet/ConnectWallet.jsx";
import { Form } from "../../components/Form/Form.jsx";
import { Logo } from "../../components/Logo/Logo.jsx";
import css from "./MainPage.module.css";
import Web3 from "web3";

export const MainPage = () => {
  const [web3, setWeb3] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState("");
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <ConnectWallet
          web3={web3}
          setWeb3={setWeb3}
          connectedAddress={connectedAddress}
          setConnectedAddress={setConnectedAddress}
        />
      </header>
      <main>
        <Form web3={web3} connectedAddress={connectedAddress} />
      </main>
      <footer className={css.footer}>
        <a
          className={css.link}
          href="https://github.com/Victoria257/my-wallet-app"
          target="_blank"
        >
          Репозиторій сайту
        </a>
      </footer>
    </div>
  );
};
