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

// Store Articles
$sql = "SELECT * FROM articles";
$result = $conn->query($sql);

if($result->num_rows > 0) {
	//output data
	while($row = $result->fetch_assoc()) {
		echo "id: " .$row["id"]. ""
	}
} else {
	echo "0 results";
}

$conn->close();

?>