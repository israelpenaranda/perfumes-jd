"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [precioMayor, setPrecioMayor] = useState("");
  const [ml, setMl] = useState("");
  const [stock, setStock] = useState("");
  const [activo, setActivo] = useState(true);

  const [imagen, setImagen] = useState<File | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
  }

  async function uploadImage() {
    if (!imagen) return null;

    const fileName = `${Date.now()}-${imagen.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, imagen);

    if (error) {
      alert(error.message);
      return null;
    }

    return `https://tvwfaizxvewuiwpmapra.supabase.co/storage/v1/object/public/products/${fileName}`;
  }

  async function createProduct() {
    const imageUrl = await uploadImage();

    const { error } = await supabase
      .from("products")
      .insert([
        {
          nombre,
          marca,
          categoria,
          descripcion,
          precio: Number(precio),
          precio_mayor: Number(precioMayor),
          ml: Number(ml),
          stock: Number(stock),
          activo,
          imagen: imageUrl,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Perfume agregado");

    clearForm();
    loadProducts();
  }

  function editProduct(product: any) {
    setEditingId(product.id);

    setNombre(product.nombre || "");
    setMarca(product.marca || "");
    setCategoria(product.categoria || "");
    setDescripcion(product.descripcion || "");
    setPrecio(product.precio?.toString() || "");
    setPrecioMayor(product.precio_mayor?.toString() || "");
    setMl(product.ml?.toString() || "");
    setStock(product.stock?.toString() || "");
    setActivo(product.activo ?? true);
  }

  async function updateProduct() {
    let imageUrl = null;

    if (imagen) {
      imageUrl = await uploadImage();
    }

    const updateData: any = {
      nombre,
      marca,
      categoria,
      descripcion,
      precio: Number(precio),
      precio_mayor: Number(precioMayor),
      ml: Number(ml),
      stock: Number(stock),
      activo,
    };

    if (imageUrl) {
      updateData.imagen = imageUrl;
    }

    const { error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Perfume actualizado");

    clearForm();
    loadProducts();
  }

  async function toggleActivo(
  id: number,
  activo: boolean
) {
  await supabase
    .from("products")
    .update({
      activo: !activo,
    })
    .eq("id", id);

  loadProducts();
}
  async function deleteProduct(id: number) {
    const confirmar = confirm(
      "¿Seguro que deseas eliminar este perfume?"
    );

    if (!confirmar) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    loadProducts();
  }

  function clearForm() {
    setEditingId(null);

    setNombre("");
    setMarca("");
    setCategoria("");
    setDescripcion("");
    setPrecio("");
    setPrecioMayor("");
    setMl("");
    setStock("");
    setActivo(true);

    setImagen(null);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "30px",
        }}
      >
        Panel Administrador
      </h1>

      <div
        style={{
          background: "white",
          color: "black",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "40px",
        }}
      >
        <h2>
          {editingId
            ? "Editar perfume"
            : "Agregar perfume"}
        </h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{
            ...inputStyle,
            minHeight: "120px",
          }}
        />

        <input
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={inputStyle}
        />

         <input
          placeholder="Precio al mayor"
          value={precioMayor}
          onChange={(e) => setPrecioMayor(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="ML"
          value={ml}
          onChange={(e) => setMl(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />

        <select
          value={activo ? "true" : "false"}
          onChange={(e) =>
            setActivo(e.target.value === "true")
          }
          style={inputStyle}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        <input
          type="file"
          onChange={(e) =>
            setImagen(e.target.files?.[0] || null)
          }
          style={{
            marginTop: "15px",
          }}
        />
        {imagen && (
  <img
    src={URL.createObjectURL(imagen)}
    alt="Vista previa"
    style={{
      width: "200px",
      marginTop: "15px",
      borderRadius: "10px",
      display: "block",
    }}
  />
)}

        <button
          onClick={
            editingId
              ? updateProduct
              : createProduct
          }
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: editingId
              ? "#2563eb"
              : "#0f172a",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {editingId
            ? "Actualizar perfume"
            : "Guardar perfume"}
        </button>

        {editingId && (
          <button
            onClick={clearForm}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "#6b7280",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cancelar edición
          </button>
        )}
      </div>

      <div
  style={{
    marginBottom: "20px",
  }}
>
  <h3>
    Total perfumes:
    {" "}
    {products.length}
  </h3>

  <h3>
    Stock total:
    {" "}
    {products.reduce(
      (acc, p) =>
        acc + p.stock,
      0
    )}
  </h3>
</div>

      <h2>Perfumes registrados</h2>
      
      <input
  placeholder="Buscar perfume..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
  }}
/>
      
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {products
  .filter((product) =>
    product.nombre
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              color: "black",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>{product.nombre}</h3>

            <p>Marca: {product.marca}</p>

            <p>Categoría: {product.categoria}</p>

            <p>Precio normal: ${product.precio}</p>

            <p>Precio al mayor: ${product.precio_mayor}</p>

            <p>Stock: {product.stock}</p>

            <p>
              Estado:{" "}
              {product.activo
                ? "✅ Activo"
                : "❌ Inactivo"}
            </p>

            {product.imagen && (
              <img
                src={product.imagen}
                alt={product.nombre}
                style={{
                  width: "150px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              />
            )}

            <button
              onClick={() => editProduct(product)}
              style={{
                marginTop: "15px",
                marginRight: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              Editar
            </button>

            <button
  onClick={() =>
    toggleActivo(
      product.id,
      product.activo
    )
  }
  style={{
    marginTop: "10px",
    marginRight: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background:
      product.activo
        ? "orange"
        : "green",
    color: "white",
    cursor: "pointer",
  }}
>
  {product.activo
    ? "Desactivar"
    : "Activar"}
</button>
            <button
              onClick={() =>
                deleteProduct(product.id)
              }
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                background: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};