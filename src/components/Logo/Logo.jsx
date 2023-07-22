import { FaEthereum } from "react-icons/fa";
import css from "./Logo.module.css";

export const Logo = () => {
  return (
    <div>
      <FaEthereum className={css.icon} />
    </div>
  );
};
