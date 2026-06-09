import ProductList from "./components/ProductList";
import Image from "next/image";
import { supabase } from "./lib/supabase";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("activo", true);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#334155 100%)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <Image
          src="/logo/jd-logo.jpg"
          alt="Perfumes JD"
          width={180}
          height={180}
          style={{
            borderRadius: "50%",
            boxShadow: "0 15px 40px rgba(255,255,255,0.15)",
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: "4rem",
            marginTop: "20px",
          }}
        >
          Perfumes JD
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "1.2rem",
          }}
        >
          Fragancias originales para hombres y mujeres
        </p>
      </div>

      <ProductList products={products || []} />
    </main>
  );
}