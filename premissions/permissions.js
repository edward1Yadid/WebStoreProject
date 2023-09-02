let permissioinSet = new Set(
  "ADD_TO_CART",
  "REMOVE_FROM_CART",
  "EMPTY_CART",
  "DISCOUNT_15"
);
let userNameEmail1 = sessionStorage.getItem("currentUserLoggedIN");
let users1 = JSON.parse(sessionStorage.getItem("users"));
let currentuser1 = users1.find((value) => value[0] == userNameEmail1)[1];

const permissioions = new Set(currentuser1.permissioinSet);

if (!permissioions.has("ADD_TO_CART")) {
  document
    .querySelectorAll(".add-to-cart")
    .forEach((element) => element.remove());
}
if (!permissioions.has("REMOVE_FROM_CART")) {
  document
    .querySelectorAll(".remove-from-cart")
    .forEach((element) => element.remove());
}
if (!permissioions.has("EMPTY_CART")) {
  document.getElementById("btnShoppingCart").remove();
}
if (
  !permissioions.has("REMOVE_FROM_CART") &&
  !permissioions.has("ADD_TO_CART")
) {
  document
    .querySelectorAll(".product-quantity")
    .forEach((elment) => elment.remove());
}
if (permissioions.has("DISCOUNT_15")) {
  const cartTableBody = document.getElementById("cartTableBody");
  const totalAmount = document.getElementById("totalAmount");
  cartTableBody.innerHTML += `
  <tr>
  <td class="text-right" colspan="3">Discount 15% </td>
  <td class="text-right">-$${Number(totalAmount.innerText.slice(1)) * 0.15}</td>
  </tr>`;

  totalAmount.innerText = `$${Number(totalAmount.innerText.slice(1) * 0.85)}`;
}
