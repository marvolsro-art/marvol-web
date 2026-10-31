import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="sk" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        {/* Official Marvol Brand Favicon & Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#020617" />
        {/* Google Font: Inter (resolves Slovak diacritics kerning issues like ľ + ú) */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased bg-slate-950 text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
