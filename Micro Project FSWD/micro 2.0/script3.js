$(document).ready(function() {

    // Add to cart button click handler
    $('.add-to-cart').click(function() {
      var name = $(this).data('name');
      var price = parseFloat($(this).data('price'));
      addToCart(name, price, 1);
    });
  
    // Remove item button click handler
    $('#cart-items').on('click', '.remove-item', function() {
      var name = $(this).data('name');
      removeFromCart(name);
    });
  
    // Update quantity input change handler
    $('#cart-items').on('change', '.quantity', function() {
      var name = $(this).data('name');
      var quantity = parseInt($(this).val());
      updateCart(name, quantity);
    });
  
    // Checkout button click handler
    $('#checkout').click(function() {
      checkout();
    });
  
    // Load cart from server on page load
    loadCart();
  
    // Add item to cart
    function addToCart(name, price, quantity) {
      $.ajax({
        url: 'cart.php',
        method: 'POST',
        dataType: 'json',
        data: {
          action: 'add',
          name: name,
          price: price,
          quantity: quantity
        },
        success: function(response) {
          updateCartView(response);
        },
        error: function(xhr, status, error) {
          console.log('Error: ' + error.message);
        }
      });
    }
  
    // Remove item from cart
    function removeFromCart(name) {
      $.ajax({
        url: 'cart.php',
        method: 'POST',
        dataType: 'json',
        data: {
          action: 'remove',
          name: name
        },
        success: function(response) {
          updateCartView(response);
        },
        error: function(xhr, status, error) {
          console.log('Error: ' + error.message);
        }
      });
    }
  
    // Update item quantity in cart
    function updateCart(name, quantity) {
      $.ajax({
        url: 'cart.php',
        method: 'POST',
        dataType: 'json',
        data: {
          action: 'update',
          name: name,
          quantity: quantity
        },
        success: function(response) {
          updateCartView(response);
        },
        error: function(xhr, status, error) {
          console.log('Error: ' + error.message);
        }
      });
    }
  
    // Load cart from server
    function loadCart() {
      $.ajax({
        url: 'cart.php',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          updateCartView(response);
        },
        error: function(xhr, status, error) {
          console.log('Error: ' + error.message);
        }
      });
    }
  
    // Checkout
    function checkout() {
      $.ajax({
        url: 'checkout.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
          if (response.status === 'success') {
            alert('Thank you for your purchase!');
            location.reload();
          } else {
            alert('There was an error processing your payment. Please try again later.');
          }
        },
        error: function(xhr, status, error) {
          console.log('Error: ' + error.message);
        }
      });
    }
  // Update cart view
function updateCartView(cart) {
    $('#cart-items').empty();
    $('#total-price').text(cart.totalPrice.toFixed(2));
    $.each(cart.items, function(name, item) {
      var html = '<tr>';
      html += '<td>' + name + '</td>';
      html += '<td>$' + item.price.toFixed(2) + '</td>';
      html += '<td><input type="number" class="quantity" min="1" value="' + item.quantity + '" data-name="' + name + '"></td>';
      html += '<td>$' + (item.price * item.quantity).toFixed(2) + '</td>';
      html += '<td><button class="btn btn-danger remove-item" data-name="' + name + '">Remove</button></td>';
      html += '</tr>';
      $('#cart-items').append(html);
    });
}
}
)
