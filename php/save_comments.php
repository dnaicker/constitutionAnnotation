<?php
$servername = "localhost";
$username = "Denver";
$password = "test";

$_POST = file_get_contents('php://input');
$data = json_decode($_POST, true);

$data_comments = json_decode($data['comments']);

// Create connection
$conn = new mysqli($servername, $username, $password, "hacktheconstitution", 8888);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE articles SET comments='{$data_comments}' WHERE title='{$data['title']}'";

print_r($sql);	


if ($conn->query($sql) === TRUE) {
	// var_dump($conn);
    echo "Record updated successfully";
} else {
	var_dump($conn);
}

$conn->close();

?>