import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!product) {
    return {
      title: "Producto no encontrado | Perfumes JD",
    };
  }

  return {
    title: `${product.nombre} | Perfumes JD`,
    description:
      product.descripcion?.slice(0, 160) ||
      `${product.nombre} de ${product.marca}`,

    openGraph: {
      title: product.nombre,
      description:
        product.descripcion?.slice(0, 160) ||
        `${product.nombre} de ${product.marca}`,
      images: [
        {
          url: product.imagen,
          width: 1200,
          height: 630,
          alt: product.nombre,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: product.nombre,
      description:
        product.descripcion?.slice(0, 160) ||
        `${product.nombre} de ${product.marca}`,
      images: [product.imagen],
    },
  };
}

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

    const { data: relatedProducts } = await supabase
  .from("products")
  .select("*")
  .eq("categoria", product?.categoria)
  .neq("id", Number(id))
  .limit(3);

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

  const telefono = "584247080130";

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
        <div className="product-detail">
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

            <p>
              <strong>Marca:</strong> {product.marca}
            </p>

            <p>
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

            <p>
              <strong>ML:</strong> {product.ml}
            </p>

            <p>
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

{relatedProducts &&
  relatedProducts.length > 0 && (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        También te puede interesar
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {relatedProducts.map((item) => (
          <Link
            key={item.id}
            href={`/producto/${item.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "15px",
                overflow: "hidden",
                background: "white",
              }}
            >
              <div
                style={{
                  height: "220px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                  background: "#f8fafc",
                }}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "15px",
                }}
              >
                <h3
                  style={{
                    color: "#111827",
                    fontSize: "1rem",
                  }}
                >
                  {item.nombre}
                </h3>

                <p
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                  }}
                >
                  ${item.precio}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
)}

          </div>
        </div>
      </div>
    </main>
  );
}