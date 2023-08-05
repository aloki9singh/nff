import Head from "next/head";
import Image from "next/image";
import React from "react";

const Layout = ({ children, pageTitle }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/NS-icon.svg" />
      </Head>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
