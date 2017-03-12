<?php
$servername = "localhost";
$username = "annotisp";
$password = "b{G-Y+rwx1et";

// Create connection
$conn = new mysqli($servername, $username, $password, "annotisp_hacktheconstitution", 3306);
// die "Connected successfully";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// die "Connected successfully";

// Get Comments
$sql = "SELECT directory FROM articles";
$result = $conn->query($sql);

if($result->num_rows > 0) {
	//output data
	while($row = $result->fetch_assoc()) {
		echo json_encode($row) . ",";
	}
} else {
	echo "0 results";
}

$conn->close();

?>