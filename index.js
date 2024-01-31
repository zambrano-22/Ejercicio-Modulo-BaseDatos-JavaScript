const addToShopingCartButtons = document.querySelectorAll("#addToCart");

addToShopingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener("click", addToCartClicked);
});

const shoppingCardItemContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

function addToCartClicked(e) {
  const button = e.target;
  //aqui tomamos el elemento mas cercano a los elementos que necesitamos
  const card = button.closest(".card");
  //Aqui traemos el titulo, la imagen y el precio
  const cardTitle = card.querySelector(".card-title").textContent;
  const cardPrice = card.querySelector(".card-text").textContent;
  const cardImage = card.querySelector(".card-img-top").src;

  //Luego pasamos esto a una funcion para recoger los datos que vamos a traer
  addItemToShopingCard(cardTitle, cardPrice, cardImage);
  //creamos el carro de compras
  createCartShopping();
}

const createCartShopping = () => {
  const newAddToShopping = document.getElementById("addToShoppingCart");

  const elemetExisting = newAddToShopping.querySelector("div");

  if (!elemetExisting) {
    const crewToShopping = document.createElement("div");
    crewToShopping.classList.add("row");
    newToShoppingConten = `
                  <h1 class="text-center">CARRITO</h1>
                  <hr>
                  <div class="col-6">
                      <div class="shopping-cart-header">
                          <h6>Producto</h6>
                      </div>
                  </div>
                  <div class="col-2">
                      <div class="shopping-cart-header">
                          <h6 class="text-truncate">Precio</h6>
                      </div>
                  </div>
                  <div class="col-4">
                      <div class="shopping-cart-header">
                          <h6>Cantidad</h6>
                      </div>
                  </div>`;
    //agregamos los elementos creados al elemento padre
    crewToShopping.innerHTML = newToShoppingConten;
    newAddToShopping.append(crewToShopping);
  }
};

function addItemToShopingCard(cardTitle, cardPrice, cardImage) {
  const elementsTitle = shoppingCardItemContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );

  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === cardTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCardRow = document.createElement("div");
  const shoppingCartContent = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${cardImage} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitle}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${cardPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                        value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div>`;

  shoppingCardRow.innerHTML = shoppingCartContent;
  shoppingCardItemContainer.append(shoppingCardRow);

  shoppingCardRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCard);

  shoppingCardRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("click", quantityChange);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    //esta linea parsea un a number para poder operar el precio y de igual manera quita los caracteres que no sean numeros
    const shoppingCartIntemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemCuantity = Number(
      shoppingCartItemQuantityElement.value
    );

    total += shoppingCartIntemPrice * shoppingCartItemCuantity;
  });
  //con el .toFixed limitamos el numero de decimales a 2
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCard(e) {
  const buttonClicked = e.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}

function quantityChange(e) {
  const input = e.target;
  //condicion ternario para que no deje poner una cantidad negativa
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}
