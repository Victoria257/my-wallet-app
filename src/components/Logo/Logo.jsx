import { FaEthereum } from "react-icons/fa";
import css from "./Logo.module.css";

export const Logo = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <a onClick={handleLogoClick}>
      <FaEthereum className={css.icon} />
    </a>
  );
};
