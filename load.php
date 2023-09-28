<?php

$conn = mysqli_connect("localhost", "root", "", "collegepartiesdb");
mysqli_set_charset($conn, "utf8");

$sql = "select * from parties";

$result = mysqli_query($conn, $sql);
echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));

?>