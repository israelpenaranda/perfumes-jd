import CartButton from "./components/CartButton";
import ProductList from "./components/ProductList";
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
      {/* Logo Premium */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "8px",
            borderRadius: "35px",
            background:
              "linear-gradient(135deg,#d4af37,#f5d67b,#d4af37)",
            boxShadow:
              "0 0 25px rgba(212,175,55,.5), 0 0 60px rgba(212,175,55,.2)",
          }}
        >
          <img
            src="/logo/jd-logo.jpg"
            alt="Perfumes JD"
            style={{
              width: "300px",
              maxWidth: "90vw",
              height: "160px",
              objectFit: "cover",
              borderRadius: "28px",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Título */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
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

        <div
          style={{
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <CartButton />
        </div>
      </div>

      {/* Productos */}
      <ProductList products={products || []} />
    </main>
  );
}