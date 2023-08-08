import Head from "next/head";
import Image from "next/image";
import React from "react";

const Layout = ({ children, pageTitle }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </div>
  );
};

export const metadata = {
  mainfest : '/manifest.webmainfest' 
};

export default Layout;
