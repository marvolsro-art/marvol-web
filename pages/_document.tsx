import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="sk" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon%20yellow.svg"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon%20black.svg"
          media="(prefers-color-scheme: light)"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased bg-slate-950 text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
