import { useState } from "preact/hooks";
import "primereact/resources/themes/lara-dark-indigo/theme.css"; //theme
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "./app.css";
import Table from "./component/Table";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Table />
    </>
  );
}
