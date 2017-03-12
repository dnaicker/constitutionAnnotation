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

//select email and password
$sql = "SELECT * FROM users WHERE username='{$data['username']}' AND password='{$data['password']}' ";

$result = $conn->query($sql);

if($result->num_rows > 0) {
	//output data
	echo "Welcome you are logged in";
} else {
	echo "User cannot be found";
}


$conn->close();

?>