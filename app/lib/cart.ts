export function addToCart(product: any) {
  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingProduct = cart.find(
    (item: any) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.cantidad += 1;
  } else {
    cart.push({
      ...product,
      cantidad: 1,
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );
}