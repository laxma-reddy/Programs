$(document).ready(function() {
    // Initialize cart
    var cart = [];
    var total = 0;
  
    // Add to cart button click handler
    $('.add-to-cart').click(function() {
      var product = $(this).data('product');
      var quantity = $('#quantity'+product.slice(-1)).val();
      if (quantity > 0) {
        var item = {
          product: product,
          quantity: quantity
        };
        cart.push(item);
        updateCart();
      }
    });
  
    // Update cart UI
    function updateCart() {
      $('#cart-items').empty();
      total = 0;
      for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var product = item.product;
        var quantity = item.quantity;
        var price = getPrice(product) * quantity;
        total += price;
        var li = $('<li></li>');
        var img = $('<img>').attr('src', product+'.jpg');
        var name = $('<span></span>').text(getName(product));
        var qty = $('<span></span>').text(quantity);
        var prc = $('<span></span>').text('$'+price.toFixed(2));
        var remove = $('<button></button>').text('Remove').data('index', i);
        remove.click(function() {
          var index = $(this).data('index');
          cart.splice(index, 1);
          updateCart();
        });
        li.append(img).append(name).append(qty).append(prc).append(remove);
        $('#cart-items').append(li);
      }
      $('#cart-total').text(total.toFixed(2));
    }
  
    // Get product name
    function getName(product) {
      switch (product) {
        case 'product1':
          return 'Product 1';
        case 'product2':
          return 'Product 2';
        default:
          return 'Unknown';
      }
    }
  
    // Get product price
    function getPrice(product) {
      switch (product) {
        case 'product1':
          return 10;
        case 'product2':
          return 15;
        default:
          return 0;
      }
    }
  
    // Checkout button click handler
    $('#checkout').click(function() {
      alert('Thank you for your purchase!\nTotal: $'+total.toFixed(2));
      cart = [];
      updateCart();
    });
  });
  