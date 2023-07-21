import css from "./Form.module.css";
export const Form = () => {
  return (
    <div className={css.container}>
      <form className={css.form}>
        <input className={css.input} />
        <input className={css.input} />
        <input className={css.input} />
      </form>
    </div>
  );
};
