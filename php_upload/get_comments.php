<?php
$servername = "localhost";
$username = "annotisp";
$password = "b{G-Y+rwx1et";

$_POST = file_get_contents('php://input');
$data = json_decode($_POST, true);

// Create connection
$conn = new mysqli($servername, $username, $password, "annotisp_hacktheconstitution", 3306);
// die "Connected successfully";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// die "Connected successfully";
// var_dump($data['title']);
// Get Comments
$sql = "SELECT * FROM articles WHERE title = '{$data['title']}' ";
$result = $conn->query($sql);

if($result->num_rows > 0) {
	//output data
	while($row = $result->fetch_assoc()) {
		echo json_encode($row);
	}
} else {
	echo "0 results";
}

$conn->close();

?>