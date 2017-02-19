<?php
$servername = "localhost";
$username = "Denver";
$password = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, "hacktheconstitution", 8888);
// die "Connected successfully";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// die "Connected successfully";

// Get Comments
$sql = "SELECT * FROM articles WHERE title = 'City_of_Cape_Town_Water_By_law_2010' ";
$result = $conn->query($sql);

if($result->num_rows > 0) {
	//output data
	while($row = $result->fetch_assoc()) {
		echo $row["comments"];
	}
} else {
	echo "0 results";
}

$conn->close();

?>