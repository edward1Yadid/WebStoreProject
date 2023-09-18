//userLoggenin check
function isUserLoggedIn() {
  return !!sessionStorage.getItem("currentUserLoggedIN"); // sessionStorage.getItem("loggedInUsersEmail") !== null
}

if (!isUserLoggedIn()) {
  window.location.href = "./login/login.html";
}

const products = [
  new Product(1, "FinePix Pro2 3D Camera", "1800.00", "camera.jpg"),
  new Product(2, "EXP Portable HD", "800.00", "external-hard-drive.jpg"),
  new Product(3, "luxury Ultra thin Wrist Watch", "500.00", "laptop.jpg"),
  new Product(4, "XP 1155 Intel Core Laptop", "1000.00", "watch.jpg"),
];

function Product(id, name, price, photo) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.photo = photo;
}
const itemCount = document.getElementById("itemCount");
const totalAmount = document.getElementById("totalAmount");
showProductGallery();
showCartTble();

function showProductGallery() {
  const productContainerElem = document.querySelector(
    "#product-item-container"
  );
  let productHtml = "";
  products.forEach((product) => {
    productHtml += `

            <div  class="Product-item" >
            <input class="product-id" type="hidden" value="${product.id}">
                <img src="/images/${product.photo}" alt="${product.name}">
                <p class="Product-name">${product.name}</p>
                <p class="Product-price">$${product.price}</p>
                <div class="">
            
                    <input class="product-quantity" type="number" name="Quantity" value="1" min="1" size="2">
                    <button class="add-to-cart" onclick="addRoCart(this)">Add</button>
                    <button class="remove-from-cart" onclick="removeFromCart(this)">Remove</button>
                </div>
               </div>`;
  });

  productContainerElem.innerHTML = productHtml;
}

showProductGallery();

function addRoCart(element) {
  const productParent = element.closest(".Product-item"); ///אלמנט שיש לו את הקלקס הזה הכי קרוב אלי
  const id = productParent.querySelector(".product-id").value;
  const price = productParent.querySelector(".Product-price").innerText;
  const name = productParent.querySelector(".Product-name").innerText;
  const quantity = productParent.querySelector(".product-quantity").value;

  const cartItem = { id, price, name, quantity };

  let cartArry = new Array();
  if (sessionStorage.getItem("shopping-cart")) {
    cartArry = JSON.parse(sessionStorage.getItem("shopping-cart"));
    console.log(cartArry);
    const index = cartArry.findIndex((value) => value.id == id); //מחפש בעגלה האם המוצר כבר קיים
    if (index !== -1) {
      cartArry[index].quantity =
        Number(cartArry[index].quantity) + Number(quantity);
    } else {
      cartArry.push(cartItem);
    }
  } else {
    cartArry.push(cartItem);
  }

  sessionStorage.setItem("shopping-cart", JSON.stringify(cartArry));
  showCartTble();
}

function showCartTble() {
  const cartTableBody = document.getElementById("cartTableBody");
  cartTableBody.innerHTML = "";
  if (sessionStorage.getItem("shopping-cart")) {
    const cartArry = JSON.parse(sessionStorage.getItem("shopping-cart"));

    let sum = 0;
    let ProducsCount = 0;
    cartArry.forEach((value) => {
      const price = value.price.slice(1);
      const quantity = parseInt(value.quantity);
      const sumbTotal = price * quantity;

      sum += sumbTotal;
      ProducsCount += quantity;

      let drawProducts = `
                <tr>
                    <th class="aling-left">${value.name}</th>
                    <th class="aling-right">${value.price}</th>
                    <th class="aling-right">${quantity}</th>
                    <th class="aling-right">$${sumbTotal}.00</th>

                </tr>`;

      cartTableBody.innerHTML += drawProducts;
    });
    totalAmount.innerText = `$${sum}.00`;
    itemCount.innerText = ProducsCount;
  } else {
    totalAmount.innerText = 0;
    itemCount.innerText = 0;
  }
}

function emptyCart() {
  if (sessionStorage.getItem("shopping-cart")) {
    sessionStorage.clear("shopping-cart");
    showCartTble();
  }
}

function removeFromCart(element) {
  const productParent = element.closest(".Product-item"); ///אלמנט שיש לו את הקלקס הזה הכי קרוב אלי
  const id = productParent.querySelector(".product-id").value;
  const quantity = productParent.querySelector(".product-quantity").value;

  let cartArry = new Array();
  if (sessionStorage.getItem("shopping-cart")) {
    cartArry = JSON.parse(sessionStorage.getItem("shopping-cart"));
    const index = cartArry.findIndex((value) => value.id == id);
    if (index !== -1) {
      cartArry[index].quantity = Math.max(
        Number(cartArry[index].quantity) - Number(quantity),
        0
      );
      if (!cartArry[index].quantity) {
        cartArry = cartArry.filter((value, index) => index !== index);
      }
    }
  }
  sessionStorage.setItem("shopping-cart", JSON.stringify(cartArry));
  showCartTble();
}
