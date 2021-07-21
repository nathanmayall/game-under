import "../styles/globals.css";

import "firebase/analytics";
import "firebase/auth";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
