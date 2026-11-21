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
        {/* Google Consent Mode v2: Strict Opt-in Default (Zero tracking before consent) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
      </Head>
      <body className="antialiased bg-slate-950 text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
