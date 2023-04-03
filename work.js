const product = [
    {
      id: 0,
      image: "exo/ordina1.png",
      title: "Ordinateur model",
      price: 200000,
    },
    {
      id: 1,
      image: "exo/o-lenovo.jpg",
      title: "Lenovo mark nouveau",
      price: 190000,
    },
    {
      id: 2,
      image: "exo/ordinateur-puissant.jpg",
      title: "Macbook ordinateur simple et originale",
      price: 900000,
    },
    {
      id: 3,
      image: "exo/bluetootht.jpg",
      title: "Bluetooth Sans Fil-Original",
      price: 35000,
    },
    {
        id: 4,
        image: "exo/imprimente hp couleur 178N.jpg",
        title: "Imprimente nouvel model",
        price: 500000,
      },
      {
        id: 5,
        image: "exo/hp pct.jpg",
        title: "Hp pc",
        price: 35000,
      },
      {
        id: 6,
        image: "exo/Camera.jpeg",
        title: "Camera Surveillance",
        price: 35000,
      },
      {
        id: 7,
        image: "exo/Ventiol 408R.jpeg",
        title: "Ventilo",
        price: 20000,
      },
      {
        id: 8,
        image: "exo/Papier Double A.jpeg",
        title: "Papier double A",
        price: 17000,
      },
      {
        id: 9,
        image: "exo/chaise-de-bureau.jpg",
        title: "Chaise de Bureau",
        price: 40000,
      },
      {
        id: 10,
        image: "exo/Televion.jpeg",
        title: "Television",
        price: 100000,
      },
      {
        id: 11,
        image: "exo/Pompage Solaire.jpg",
        title: "Popage Solaire",
        price: 200000,
      },
      {
        id: 12,
        image: "exo/cle-usb-imation-4gb.jpg",
        title: "Cles usb 4gb",
        price: 3000,
      },
      {
        id: 13,
        image: "exo/congelateur-vertical-beko-rfsa240m21w-1.jpg",
        title: "Congelateur beko",
        price: 405000,
      },
      {
        id: 14,
        image: "exo/hp 123.png",
        title: "Cartouche",
        price: 12000,
      },
      {
        id: 15,
        image: "exo/toshiba.jpg",
        title: "Cles usb",
        price: 4500,
      },
      {
        id: 16,
        image: "exo/disque 1 tera.jpg",
        title: "disque dure externe",
        price: 40000,
      },
      {
        id: 17,
        image: "exo/disque due externe.jpg",
        title: "disque",
        price: 45000,
      },
      {
        id: 18,
        image: "exo/samsung-monitor.jpg",
        title: "Samsung",
        price: 500000,
      },
      {
        id: 19,
        image: "exo/principal-495.jpg",
        title: "Ecrant",
        price: 550000,
      },
  ];
  
  
  const categories = [...new Set(product.map((item) => item.id))];
  
  let i = 0;
  document.getElementById("root").innerHTML = categories
    .map((id) => {
      const { image, title, price } = product.find((item) => item.id === id);
      return `
        <div class="box">
          <div class="img-box">
            <img class="images" src="${image}">
          </div>
          <div class="bottom">
            <p>${title}</p>
            <h2>CFA${price}</h2>
            <button onclick="addtocart(${id})">Add to cart</button>
          </div>
        </div>
      `;
    })
    .join("");
  
    var cart = [];
   
    function addtocart(id) {
      cart.push({...product.find((item) => item.id === id), quantity: 1});
      
      
      displaycart();
    }
    
    function delElement(id) {
      cart.splice(id, 1);
      displaycart();
    }
    
    function displaycart() {
      let j = 0;
      let total = 0;
      document.getElementById("count").innerHTML = cart.length;
      document.getElementById("total").innerHTML = "CFA " + total.toFixed(2);
      if (cart.length == 0) {
        document.getElementById("cartItem").innerHTML = "Your cart is empty";
      } else {
        document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
          var { image, title, price, quantity } = item;
          total += price * quantity;
          return `
            <div class="cart-item">
              <div class="row-img">
                <img class="images" src="${image}">
              </div>
              <p style="font-size:12px;">${title}</p>
              <div>
                <input type="number" class="quantity" value="${quantity}" onchange="changeQuantity(${index}, this.value)">
              </div>
              <h2>CFA${(price * quantity).toFixed(2)}</h2>
              <i class="fa-solid fa-trash" onclick="delElement(${j++})"></i>
            </div>
          `;
        }).join("");
        document.getElementById("total").innerHTML = "CFA " + total.toFixed(2);
      }
    }
    
    function changeQuantity(index, quantity) {
      cart[index].quantity = quantity;
      displaycart();
    }
      const buyButton = document.querySelector(".btn-buy");
   
 
buyButton.addEventListener('click', function() {
 
alert("votre commande avec succes!");

});
      
$(document).ready(function() {
  $(".btn-buy").click(function() {
    if ($("#count").text() !== "0") {
      $(".form-container").show();
    }
  });
});

// Récupérer le nombre de produits dans le panier et mettre à jour le nombre sur le bouton de panier
function updateCartCount() {
  let count = localStorage.getItem('cartCount');
  if (!count) {
    count = 0;
  }
  $('#count').text(count);
}

// Ajouter un produit au panier et mettre à jour le nombre de produits dans le panier
function addToCart(name, price) {
  let cartItems = localStorage.getItem('cartItems');
  if (!cartItems) {
    cartItems = {};
  } else {
    cartItems = JSON.parse(cartItems);
  }

  if (cartItems[name]) {
    cartItems[name].quantity += 1;
  } else {
    cartItems[name] = { price, quantity: 1 };
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  let cartCount = localStorage.getItem('cartCount');
  if (!cartCount) {
    cartCount = 0;
  }
  cartCount = parseInt(cartCount) + 1;
  localStorage.setItem('cartCount', cartCount);

  updateCartCount();
}

// Afficher les produits dans le panier et calculer le total
function displayCart() {
  let cartItems = localStorage.getItem('cartItems');
  if (!cartItems) {
    cartItems = {};
  } else {
    cartItems = JSON.parse(cartItems);
  }

  if (Object.keys(cartItems).length === 0) {
    $('#cartItem').text('');
    $('#paniervide').show();
    $('.form-container').hide();
    $('.invoice').hide();
    return;
  }

  let totalPrice = 0;
  let cartTable = '';

  for (const [name, { price, quantity }] of Object.entries(cartItems)) {
    totalPrice += price * quantity;
    cartTable += `
      <tr>
        <td>${name} x ${quantity}</td>
        <td>${price} CFA</td>
      </tr>
    `;
  }

  $('#order-items').html(cartTable);
  $('#total-amount').text(totalPrice + ' CFA');

  $('#cartItem').text('');
  $('#paniervide').hide();
  $('.form-container').show();
  $('.invoice').hide();
}

// Soumettre le formulaire de commande et afficher la facture
$('#order-form').submit(function (event) {
  event.preventDefault();

  let name = $('#name').val();
  let lastname = $('#lastname').val();
  let birthdate = $('#birthdate').val();
  let mail = $('#email').val();
  let address = $('#address').val();

  $('#customer-name').text(name);
  $('#customer-lastname').text(lastname);
  $('#customer-address').text(address);
  $('#customer-birthdate').text(birthdate);

  displayCart();
  $('.invoice').show();
});

// Télécharger la facture en PDF
$('#download-button').click(function () {
  const element = document.querySelector('.invoice');
  html2pdf().from(element).save();
});

// Imprimer la facture
$('#print-button').click(function () {
  window.print();
});

// Initialiser la page
$(document).ready(function () {
  updateCartCount();
  displayCart();
});



$(document).ready(function() {

  // Fonction pour afficher les informations du panier et mettre à jour le total
  function showCart(cart) {
    var cartArray = Object.values(cart);
    var total = 0;

    // Générer la liste des articles du panier
    var cartList = cartArray.map(function(item) {
      total += item.price * item.qty;
      return `<tr>
                <td>${item.name} x ${item.qty}</td>
                <td>${item.price} CFA</td>
              </tr>`;
    }).join('');

    // Mettre à jour le compteur de panier
    $('#count').text(cartArray.length);

    // Afficher le contenu du panier dans la barre latérale
    if (cartArray.length > 0) {
      $('#cartItem').html(`<table>${cartList}</table>`);
      $('#total').html(`CFA ${total}`);

      // Afficher le formulaire de commande
      $('.form-container').show();

    } else {
      $('#cartItem').html('Your cart is empty');
      $('#total').html(`CFA 0`);
      $('.form-container').hide();

    }
  }

  // Initialiser le panier
  var cart = {};

  // Ajouter un produit au panier
  $('.product').on('click', '.add-to-cart', function() {
    var $product = $(this).closest('.product');
    var productId = $product.data('id');
    var productName = $product.find('.name').text();
    var productPrice = $product.find('.price').text();
    productPrice = parseFloat(productPrice.replace('CFA', '').trim());
    
    // Vérifier si le produit est déjà dans le panier
    if (cart[productId]) {
      cart[productId].qty += 1;
    } else {
      cart[productId] = {
        id: productId,
        name: productName,
        price: productPrice,
        qty: 1
      };
    }

    // Afficher les informations du panier
    showCart(cart);
  });

  // Soumettre le formulaire de commande
  $('#order-form').submit(function(e) {
    e.preventDefault();
    
    // Récupérer les informations de commande du formulaire
    var customerName = $('#name').val();
    var customerLastname = $('#lastname').val();
    var customerBirthdate = $('#birthdate').val();
    var customerEmail = $('#email').val();
    var customerAddress = $('#address').val();

    // Afficher les informations client sur la facture
    $('#customer-name').text(customerName);
    $('#customer-lastname').text(customerLastname);
    $('#customer-address').text(customerAddress);
    $('#customer-birthdate').text(customerBirthdate);

    // Générer la liste des articles commandés
    var orderList = Object.values(cart).map(function(item) {
      return `<tr>
                <td>${item.name} x ${item.qty}</td>
                <td>${item.price} CFA</td>
              </tr>`;
    }).join('');

    // Afficher les détails de la commande sur la facture
    $('#order-items').html(orderList);
    $('#total-amount').text(` ${$('#total').text()}`);

    // Afficher la facture
    $('.invoice').show();
    $('#root').hide();
    $('#count').text('0');
    $('#cartItem').html('Your cart is empty');
    cart = {};
   


  });

});



function generatePDF() {
  const doc = new jsPDF();

  // Sélectionner la zone HTML à convertir en PDF
  const element = document.getElementById("my-element");

  // Convertir la zone en canvas HTML
  html2canvas(element, { type: "png" }).then((canvas) => {
    //...
 
  
    // Récupérer la largeur et la hauteur de la zone
    const width = canvas.width;
    const height = canvas.height;

    // Ajouter le canvas au document PDF
    doc.addImage(canvas, "JPEG", 0, 0, width, height);

    // Générer l'URL de téléchargement
    const url = doc.output('dataurl');

    // Mettre à jour le lien de téléchargement avec l'URL
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = url; 

    // Déclencher un clic sur le lien de téléchargement
    downloadLink.click();
  });
}

// Ajouter un gestionnaire d'événements click sur le bouton de téléchargement
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', generatePDF);



