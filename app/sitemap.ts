import { supabase } from "./lib/supabase";

export default async function sitemap() {
  const { data: products } = await supabase
    .from("products")
    .select("id");

  const productUrls =
    products?.map((product) => ({
      url: `https://perfumes-jd.vercel.app/producto/${product.id}`,
      lastModified: new Date(),
    })) || [];

  return [
    {
      url: "https://perfumes-jd.vercel.app",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}