<?php
$servername = "localhost";
$username = "annotisp";
$password = "b{G-Y+rwx1et";

$_POST = file_get_contents('php://input');
$data = json_decode($_POST, true);

// Create connection
$conn = new mysqli($servername, $username, $password, "annotisp_hacktheconstitution", 3306);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE articles SET comments='{$data['comments']}' WHERE title='{$data['title']}'";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
	var_dump($conn);
}

$conn->close();

?>