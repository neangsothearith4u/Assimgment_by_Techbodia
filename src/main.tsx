import { render } from "preact";
import { App } from "./app.tsx";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
render(
  <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
    <Provider store={store}>
      <App />
    </Provider>
  </PrimeReactProvider>,
  document.getElementById("app")!
);
