import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!product) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white",
          fontSize: "2rem",
        }}
      >
        Producto no encontrado
      </main>
    );
  }

  const telefono = "584247080130"; // Cambia por tu número

  const mensaje = encodeURIComponent(
    `Hola, me interesa el perfume ${product.nombre}`
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          background: "white",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,.3)",
        }}
      >
        <div
         style={{
         display: "grid",
        gridTemplateColumns:
         "repeat(auto-fit, minmax(320px, 1fr))",
         gap: "40px",
        padding: "40px",
           }}
      >
          {/* Imagen */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f8fafc",
              borderRadius: "20px",
              minHeight: "350px",
              padding: "20px",
            }}
          >
            <img
              src={product.imagen}
              alt={product.nombre}
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Información */}
          <div>
            <h1
              style={{
                fontSize: "3rem",
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              {product.nombre}
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              <strong>Marca:</strong> {product.marca}
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "10px",
              }}
            >
              <strong>Categoría:</strong> {product.categoria}
            </p>

            <div
              style={{
                marginTop: "25px",
                marginBottom: "25px",
                fontSize: "3rem",
                fontWeight: "bold",
                color: "#16a34a",
              }}
            >
              ${product.precio}
            </div>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "10px",
              }}
            >
              <strong>ML:</strong> {product.ml}
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "20px",
              }}
            >
              <strong>Stock:</strong> {product.stock}
            </p>

            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "15px",
                lineHeight: "1.8",
                color: "#374151",
              }}
            >
              {product.descripcion}
            </div>

            <a
              href={`https://wa.me/${telefono}?text=${mensaje}`}
              target="_blank"
            >
              <button
                style={{
                  width: "100%",
                  marginTop: "30px",
                  padding: "18px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#25D366",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
              >
                Comprar por WhatsApp
              </button>
            </a>

            <Link href="/">
              <button
                style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "18px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#0f172a",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Volver al catálogo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}