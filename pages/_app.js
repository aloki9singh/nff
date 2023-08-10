import "../styles/componentsstyling/global/global.css";

import ContextProvider from "../lib/context/contextprovider";

import { AuthContextProvider } from "@/lib/context/AuthContext";

import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import Error from "@/components/common/error/error";

function FallbackRenderer({ error, resetErrorBoundary }) {
  return (
    // <div role="alert">
    //   <p className="text-white" >Something went wrong:</p>
    //   <pre style={{ color: "red" }}>{error.message}</pre>
    // </div>
    <Error message={error.message} />
  );
}


function MyApp({ Component, pageProps }) {


  return (
    <ErrorBoundary
      fallbackRender={FallbackRenderer}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}

    >
      <ContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ContextProvider>
    </ErrorBoundary>
  );
}

export default MyApp;