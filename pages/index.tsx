import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
import Head from "next/head";

const AIChatWidget = dynamic(() => import("../components/AIChatWidget"), { ssr: false });

function extractBodyHtml(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyHtml = match?.[1] ?? html;
  return bodyHtml.replace(/<script\b[^>]*src=["']\/script\.js["'][^>]*>[\s\S]*?<\/script>/gi, "");
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "index.html");
  const rawHtml = fs.readFileSync(filePath, "utf8");
  return {
    props: {
      pageHtml: extractBodyHtml(rawHtml)
    }
  };
}

type HomeProps = {
  pageHtml: string;
};

export default function Home({ pageHtml }: HomeProps) {
  return (
    <>
      <Head>
        <title>Sumeet Boob | Enterprise Transformation & Delivery Leader | PMP®</title>
        <meta name="description" content="Portfolio of Sumeet Boob - Enterprise Transformation & Delivery Leader | Program & Portfolio Management | PMP® | 20 Years of Global Leadership" />
        {/* Restore saved theme before first paint to avoid a flash of the default theme.
            Must live here (not in pageHtml) because React does not execute
            inline scripts injected via dangerouslySetInnerHTML. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("sumeet-portfolio-theme")||localStorage.getItem("theme");if(t&&t!=="light"&&document.documentElement){document.documentElement.classList.add(t);}}catch(e){}})();`
          }}
        />
      </Head>

      <div style={{ minHeight: "100vh", position: "relative", background: "var(--bg-color)" }}>
        <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
        <AIChatWidget />
      </div>
    </>
  );
}
