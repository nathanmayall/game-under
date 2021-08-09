import "../styles/globals.css";

import "firebase/analytics";
import "firebase/auth";
import Head from "next/head";

import axios from "axios";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

axios.defaults.baseURL = process.env.APP_BASE_URL;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GameUnder</title>
        <meta
          name="description"
          content="It's Game Over to paying rip-off Prices!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
