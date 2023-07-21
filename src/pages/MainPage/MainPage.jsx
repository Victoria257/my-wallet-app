import { ConnectWallet } from "../../components/ConnectWallet/ConnectWallet.jsx";
import { Form } from "../../components/Form/Form.jsx";
import { Logo } from "../../components/Logo/Logo.jsx";
import css from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <ConnectWallet />
      </header>
      <main>
        <Form />
      </main>
      <footer>
        <a>Репозиторій сайту</a>
      </footer>
    </div>
  );
};
