import { useState } from "react";
import ConnectWallet from "../../components/ConnectWallet/ConnectWallet.jsx";
import { Form } from "../../components/Form/Form.jsx";
import { Logo } from "../../components/Logo/Logo.jsx";
import css from "./MainPage.module.css";
import { FaGithub } from "react-icons/fa";

export const MainPage = () => {
  const [web3, setWeb3] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [metaMaskSDK, setMetaMaskSDK] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <ConnectWallet
          web3={web3}
          setWeb3={setWeb3}
          connectedAddress={connectedAddress}
          setConnectedAddress={setConnectedAddress}
          balance={balance}
          setBalance={setBalance}
          metaMaskSDK={metaMaskSDK}
          setMetaMaskSDK={setMetaMaskSDK}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      </header>
      <main>
        <Form
          web3={web3}
          connectedAddress={connectedAddress}
          balance={balance}
          setBalance={setBalance}
          metaMaskSDK={metaMaskSDK}
          setMetaMaskSDK={setMetaMaskSDK}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      </main>
      <footer className={css.footer}>
        <a
          href="https://github.com/Victoria257/my-wallet-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className={css.gitIcon} />
        </a>
      </footer>
    </div>
  );
};
