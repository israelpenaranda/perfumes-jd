"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
const [cart, setCart] = useState<any[]>([]);

useEffect(() => {
const saved = JSON.parse(
localStorage.getItem("cart") || "[]"
);


setCart(saved);


}, []);

const guardarCarrito = (nuevoCarrito: any[]) => {
setCart(nuevoCarrito);


localStorage.setItem(
  "cart",
  JSON.stringify(nuevoCarrito)
);

window.dispatchEvent(
  new Event("cartUpdated")
);


};

const aumentarCantidad = (index: number) => {
const nuevoCarrito = [...cart];


nuevoCarrito[index].cantidad =
  (nuevoCarrito[index].cantidad || 1) + 1;

guardarCarrito(nuevoCarrito);


};

const disminuirCantidad = (index: number) => {
const nuevoCarrito = [...cart];


if (
  (nuevoCarrito[index].cantidad || 1) > 1
) {
  nuevoCarrito[index].cantidad -= 1;

  guardarCarrito(nuevoCarrito);
}


};

const eliminarProducto = (index: number) => {
const nuevoCarrito = [...cart];


nuevoCarrito.splice(index, 1);

guardarCarrito(nuevoCarrito);


};

const vaciarCarrito = () => {
setCart([]);


localStorage.removeItem("cart");

window.dispatchEvent(
  new Event("cartUpdated")
);


};

const total = cart.reduce(
(acc, item) =>
acc +
item.precio *
(item.cantidad || 1),
0
);

const comprarWhatsapp = () => {
const mensaje = `Hola, quiero realizar este pedido:

${cart
.map(
(item) =>
`• ${item.nombre} x${
        item.cantidad || 1
      } - $${
        item.precio *
        (item.cantidad || 1)
      }`
)
.join("\n")}

Total: $${total}`;


window.open(
  `https://wa.me/584247080130?text=${encodeURIComponent(
    mensaje
  )}`,
  "_blank"
);


};

return (
<main
style={{
maxWidth: "900px",
margin: "40px auto",
padding: "20px",
}}
> <h1>🛒 Carrito</h1>


  {cart.length === 0 && (
    <p>Tu carrito está vacío.</p>
  )}

  {cart.map((item, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "12px",
      }}
    >
      <h3>{item.nombre}</h3>

      <p>
        Precio: ${item.precio}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() =>
            disminuirCantidad(index)
          }
        >
          ➖
        </button>

        <strong>
          {item.cantidad || 1}
        </strong>

        <button
          onClick={() =>
            aumentarCantidad(index)
          }
        >
          ➕
        </button>
      </div>

      <p>
        Subtotal: $
        {item.precio *
          (item.cantidad || 1)}
      </p>

      <button
        onClick={() =>
          eliminarProducto(index)
        }
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🗑 Eliminar
      </button>
    </div>
  ))}

  {cart.length > 0 && (
    <>
      <h2>Total: ${total}</h2>

      <button
        onClick={comprarWhatsapp}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "12px",
          background: "#25D366",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        📲 Finalizar pedido por WhatsApp
      </button>

      <button
        onClick={vaciarCarrito}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "12px",
          background: "#111827",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🗑 Vaciar carrito
      </button>
    </>
  )}
</main>


);
}
