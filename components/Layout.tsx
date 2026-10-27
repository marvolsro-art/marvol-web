import React from 'react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileStickyBar } from '@/components/MobileStickyBar';

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonicalPath: string;
  schema?: object | object[];
  isSubpage?: boolean;
  noindex?: boolean;
  ogImage?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  canonicalPath,
  schema,
  isSubpage = true,
  noindex = false,
  ogImage = 'https://marvol.sk/og.png',
}) => {
  const fullCanonical = canonicalPath.startsWith('http')
    ? canonicalPath
    : `https://marvol.sk${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950 flex flex-col overflow-x-hidden w-full">
      <Head>
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />

        {/* Indexation & Robots control */}
        <meta
          key="robots"
          name="robots"
          content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
        />

        {/* Open Graph / Social metadata */}
        <meta key="og:site_name" property="og:site_name" content="Marvol s.r.o." />
        <meta key="og:locale" property="og:locale" content="sk_SK" />
        <meta key="og:title" property="og:title" content={title} />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="og:url" property="og:url" content={fullCanonical} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:image" property="og:image" content={ogImage} />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta key="og:image:alt" property="og:image:alt" content="Marvol s.r.o. - Fotovoltické riešenia na kľúč" />

        {/* Twitter Card */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={title} />
        <meta key="twitter:description" name="twitter:description" content={description} />
        <meta key="twitter:image" name="twitter:image" content={ogImage} />

        {/* Canonical Link */}
        <link key="canonical" rel="canonical" href={fullCanonical} />

        {/* Schema.org JSON-LD Structured Data */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>

      <Header />

      <main className={`flex-1 w-full overflow-x-hidden ${isSubpage ? 'pt-28 md:pt-36' : ''}`}>
        {children}
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Layout;
