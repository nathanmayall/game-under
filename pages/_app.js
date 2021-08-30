import { config } from "@fortawesome/fontawesome-svg-core";

import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "firebase/analytics";
import "firebase/auth";
import Head from "next/head";

import axios from "axios";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

config.autoAddCss = false;

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          async
          defer
          data-domain="gameunder.store"
          src="https://stats.nathanmayall.com/js/plausible.js"
        />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
