$(document).ready(function() {
    var cart = [];
  
    $(".add-to-cart").click(function() {
      var name = $(this).data("name");
      var price = Number($(this).data("price"));
      addItemToCart(name, price, 1);
      displayCart();
    });
  
    $("#cart-items").on("click", ".remove-item", function(event) {
      var name = $(this).data("name");
      removeItemFromCartAll(name);
      displayCart();
    });
  
    $("#cart-items").on("change", ".item-count", function(event) {
      var name = $(this).data("name");
      var count = Number($(this).val());
      changeItemQuantity(name, count);
      displayCart();
    });
  
    function addItemToCart(name, price, quantity) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].quantity += quantity;
          return;
        }
      }
      var item = { name: name, price: price, quantity: quantity };
      cart.push(item);
    }
  
    function removeItemFromCartAll(name) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart.splice(i, 1);
          break;
        }
      }
    }
  
    function changeItemQuantity(name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].quantity = count;
          break;
        }
      }
    }
  
    function displayCart() {
      var cartItems = $("#cart-items");
      cartItems.empty();
      var totalPrice = 0;
      for (var i in cart) {
        var item = cart[i];
        var itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
        var li = $("<li></li>");
        li.addClass("clearfix");
        var spanName = $("<span></span>");
        spanName.text(item.name);
        var spanPrice = $("<span></span>");
        spanPrice.text("$" + item.price.toFixed(2));
        var inputCount = $("<input></input>");
        inputCount.attr("type", "number");
        inputCount.addClass("item-count");
        inputCount.attr("data-name", item.name);
        inputCount.val(item.quantity);
        var buttonRemove = $("<button></button>");
        buttonRemove.addClass("remove-item");
        buttonRemove.attr("data-name", item.name);
        buttonRemove.text("Remove");
        li.append(spanName);
        li.append("<br>");
        li.append(spanPrice);
        li.append("<br>");
        li.append(inputCount);
        li.append(buttonRemove);
        cartItems.append(li);
      }
      $("#total-price").text(totalPrice.toFixed(2));
    }
  
    $("#checkout").click(function() {
      cart = [];
      displayCart();
      alert("Thank you for your purchase!");
    });
  });
  