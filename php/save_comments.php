<?php
$servername = "localhost";
$username = "Denver";
$password = "test";

$_POST = file_get_contents('php://input');
$data = json_decode($_POST, true);

// Create connection
$conn = new mysqli($servername, $username, $password, "hacktheconstitution", 8888);

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