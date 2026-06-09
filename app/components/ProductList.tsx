"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductList({
  products,
}: {
  products: any[];
}) {
  const [categoria, setCategoria] = useState("Todos");
  const [search, setSearch] = useState("");
  const [orden, setOrden] = useState("default");

  const filteredProducts = products
    .filter((p) => {
      const matchCategoria =
        categoria === "Todos" ||
        p.categoria === categoria;

      const matchBusqueda =
        p.nombre
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        p.marca
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchCategoria && matchBusqueda;
    })
    .sort((a, b) => {
      if (orden === "precio-asc") {
        return a.precio - b.precio;
      }

      if (orden === "precio-desc") {
        return b.precio - a.precio;
      }

      if (orden === "nuevos") {
        return b.id - a.id;
      }

      return 0;
    });

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#334155",
    color: "white",
  };

  return (
    <>
      {/* BUSCADOR */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 25px auto",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Buscar perfume o marca..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "2px solid #cbd5e1",
            background: "white",
            color: "#111827",
            fontSize: "16px",
            outline: "none",
          }}
        />
      </div>

      {/* FILTROS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        {[
          "Todos",
          "Hombre",
          "Mujer",
          "Unisex",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setCategoria(cat)
            }
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              background:
                categoria === cat
                  ? "#ffffff"
                  : "#334155",
              color:
                categoria === cat
                  ? "#0f172a"
                  : "white",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ORDENAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            setOrden("precio-asc")
          }
          style={buttonStyle}
        >
          💰 Menor precio
        </button>

        <button
          onClick={() =>
            setOrden("precio-desc")
          }
          style={buttonStyle}
        >
          💎 Mayor precio
        </button>

        <button
          onClick={() =>
            setOrden("nuevos")
          }
          style={buttonStyle}
        >
          🆕 Más nuevos
        </button>

        <button
          onClick={() =>
            setOrden("default")
          }
          style={buttonStyle}
        >
          🔄 Reiniciar
        </button>
      </div>

      {/* MENSAJE SIN RESULTADOS */}
      {filteredProducts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "1.2rem",
            marginBottom: "40px",
          }}
        >
          No se encontraron perfumes.
        </div>
      )}

      {/* PRODUCTOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(400px,1fr))",
          gap: "30px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "450px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f8fafc",
                padding: "20px",
              }}
            >
              {product.imagen && (
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>

            <div style={{ padding: "25px" }}>
              <h2>{product.nombre}</h2>

              <p>
                <strong>Marca:</strong>{" "}
                {product.marca}
              </p>

              <p>
                <strong>Categoría:</strong>{" "}
                {product.categoria}
              </p>

              <p
  style={{
    marginTop: "10px",
    fontWeight: "bold",
    color:
      product.stock > 0
        ? "#16a34a"
        : "#dc2626",
  }}
>
  {product.stock > 0
    ? `✅ Disponible (${product.stock})`
    : "❌ Agotado"}
</p>

              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    background:
                      "linear-gradient(135deg,#0f172a,#1e293b)",
                    color: "white",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                  }}
                >
                  ${product.precio}
                </span>
              </div>

              <Link
                href={`/producto/${product.id}`}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "#0f172a",
                  color: "white",
                  textDecoration: "none",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Ver producto
              </Link>
              {product.stock > 0 && (
  <a
  href={`https://api.whatsapp.com/send?phone=584247080130&text=${encodeURIComponent(
`Hola, me interesa este perfume.

Nombre: ${product.nombre}
Marca: ${product.marca}
Categoría: ${product.categoria}
Precio: $${product.precio}
ML: ${product.ml}

¿Está disponible?`
  )}`}
  target="_blank"
  style={{
    display: "block",
    width: "100%",
    marginTop: "12px",
    padding: "14px",
    borderRadius: "12px",
    background: "#25D366",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  📲 Consultar por WhatsApp
</a>
)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}