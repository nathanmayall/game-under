import Head from "next/head";
import axios from "axios";

import "firebase/auth";
import "firebase/analytics";

import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

config.autoAddCss = false;

axios.defaults.baseURL = process.env.APP_BASE_URL;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GameUnder</title>
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
