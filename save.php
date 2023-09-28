<?php

$conn = mysqli_connect("localhost", "root", "", "collegepartiesdb");

// Check if the connection was successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

$title = $data["title"];
$date = $data["date"];
$time = $data["time"];
$location = $data["location"];
$description = $data["description"];
$category = $data["category"];
$price = $data["price"];
$seats = $data["seats"];

$sql = "
    INSERT INTO parties (title, date, time, location, description, category, price, seats)
    VALUES ('$title','$date','$time','$location','$description','$category','$price','$seats')
";

$result = mysqli_query($conn, $sql);

$response = ["saved" => $result];

if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . json_encode($response) . ')';
} else {
    echo json_encode($response);
}

mysqli_close($conn);
?>
