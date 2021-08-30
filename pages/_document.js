import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
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
          ></script>
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "9802bf5deb2b4e01a2a1c8aca785c761"}'
          ></script>
          <meta property="og:title" content="GameUnder" />
          <meta property="og:site_name" content="GameUnder.store" />
          <meta property="og:url" content="https://gameunder.store" />
          <meta
            property="og:description"
            content="A site to compare video game prices across a variety of markets."
          />
          <meta property="og:type" content="product" />
          <meta
            property="og:image"
            content="https://gameunder.store/_next/image?url=https%3A%2F%2Fsteamcdn-a.akamaihd.net%2Fsteam%2Fapps%2F292030%2Fheader.jpg%3Ft%3D1598535144&w=640&q=75"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
