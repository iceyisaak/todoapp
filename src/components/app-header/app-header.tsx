import style from "./app-header.module.scss";

const AppHeader = () => {
  return (
    <header className={`${style["header"]}`}>
      <h1 className={`${style["h1"]}`}>TodoApp</h1>
      <h4 className={`${style["h4"]}`}>ReactTS + useReducer() + ContextAPI</h4>
    </header>
  );
};
export default AppHeader;
