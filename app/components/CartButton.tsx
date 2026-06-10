"use client";

import { useEffect, useState } from "react";

export default function CartButton() {
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    const actualizar = () => {
      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCantidad(cart.length);
    };

    actualizar();

    window.addEventListener(
      "cartUpdated",
      actualizar
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        actualizar
      );
    };
  }, []);

  return (
    <a
      href="/cart"
      style={{
        background: "#f59e0b",
        color: "white",
        padding: "12px 24px",
        borderRadius: "999px",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      🛒 Ver carrito ({cantidad})
    </a>
  );
}