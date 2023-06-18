import "../styles/style/style.module.css";
import { Provider } from "react-redux";

import ContextProvider from "../pages/_app";

import { store } from "../redux/store/store";

function MyApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Provider>
  );
}

export default MyApp;
