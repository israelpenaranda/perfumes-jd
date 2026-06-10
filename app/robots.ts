export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://perfumes-jd.vercel.app/sitemap.xml",
  };
}