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

//insert email and password
$sql = "INSERT INTO `users`(`id`, `username`, `password`, `site_roles`, `profession`) VALUES (0,'{$data['username']}','{$data['password']}','','')";

if ($conn->query($sql) === TRUE) {
    echo "You are now registered";
} else {
	echo "There was a problem and registration could not be completed";
}

$conn->close();

?>