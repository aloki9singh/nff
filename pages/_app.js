import "../styles/componentsstyling/global/global.css";

import ContextProvider from "../lib/context/contextprovider";

import { AuthContextProvider } from "@/lib/context/AuthContext";

function MyApp({ Component, pageProps }) {


  return (
   
      <ContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ContextProvider>
 
  );
}

export default MyApp;