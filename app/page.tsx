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
        padding: "20px 15px",
        background:
          "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#334155 100%)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/logo/jd-logo.jpg"
          alt="Perfumes JD"
          width={180}
          height={180}
          style={{
            display: "block",
            margin: "0 auto",
            borderRadius: "50%",
            boxShadow:
              "0 15px 40px rgba(255,255,255,0.15)",
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Perfumes JD
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Fragancias originales para hombres y mujeres
        </p>
      </div>

      <ProductList products={products || []} />
    </main>
  );
}