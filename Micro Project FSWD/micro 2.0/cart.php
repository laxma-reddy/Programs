<?php

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'username');
define('DB_PASSWORD', 'password');
define('DB_NAME', 'database_name');

// Connect to the database
$conn = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if (!$conn) {
  die('Database connection failed: ' . mysqli_connect_error());
}

// Initialize cart session
session_start();
if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = array('items' => array(), 'totalPrice' => 0);
}

// Handle add to cart action
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'add') {
  $name = $_POST['name'];
  $price = $_POST['price'];
  $quantity = $_POST['quantity'];
  
  // Check if item already exists in cart
  if (isset($_SESSION['cart']['items'][$name])) {
    // Update quantity
    $_SESSION['cart']['items'][$name]['quantity'] += $quantity;
  } else {
    // Add new item to cart
    $_SESSION['cart']['items'][$name] = array('price' => $price, 'quantity' => $quantity);
  }
  
  // Update total price
  $_SESSION['cart']['totalPrice'] += $price * $quantity;

  // Return updated cart as JSON
  echo json_encode($_SESSION['cart']);

  // Save cart to database
  saveCartToDatabase();
}

// Handle remove item from cart action
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'remove') {
  $name = $_POST['name'];
  
  // Remove item from cart
  $price = $_SESSION['cart']['items'][$name]['price'];
  $quantity = $_SESSION['cart']['items'][$name]['quantity'];
  unset($_SESSION['cart']['items'][$name]);
  
  // Update total price
  $_SESSION['cart']['totalPrice'] -= $price * $quantity;

  // Return updated cart as JSON
  echo json_encode($_SESSION['cart']);

  // Save cart to database
  saveCartToDatabase();
}

// Handle update item quantity in cart action
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'update') {
  $name = $_POST['name'];
  $quantity = $_POST['quantity'];
  
  // Update item quantity
  $price = $_SESSION['cart']['items'][$name]['price'];
  $_SESSION['cart']['items'][$name]['quantity'] = $quantity;
  
  // Update total price
  $_SESSION['cart']['totalPrice'] += ($quantity - $price) * $quantity;

  // Return updated cart as JSON
  echo json_encode($_SESSION['cart']);

  // Save cart to database
  saveCartToDatabase();
}

// Function to save cart to database
function saveCartToDatabase() {
  global $conn;
  $cart = $_SESSION['cart'];
  $items = json_encode($cart['items']);
  $totalPrice = $cart['totalPrice'];
  $query = "INSERT INTO carts (items, total_price) VALUES ('$items', $totalPrice)";
  mysqli_query($conn, $query);
}
