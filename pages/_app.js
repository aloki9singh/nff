import "../styles/globals.css";
import { Provider } from "react-redux";

import ContextProvider from "../lib/context/contextprovider";
import { store } from "../redux/store";

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