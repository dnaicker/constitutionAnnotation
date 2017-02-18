<?php
$servername = "localhost";
$username = "Denver";
$password = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, "hacktheconstitution", 8888);
echo "Connected successfully";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";

// Get Articles



?>