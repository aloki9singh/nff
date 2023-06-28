import "../styles/componentsstyling/global/global.css";
import { Provider } from "react-redux";

import ContextProvider from "../lib/context/contextprovider";

import { store } from "../redux/store";
import { AuthContextProvider } from "@/lib/context/AuthContext";

function MyApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ContextProvider>
    </Provider>
  );
}

export default MyApp;