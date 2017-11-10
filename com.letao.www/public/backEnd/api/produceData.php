<?php

$conn = mysqli_connect('localhost', 'root', '123', 'letao');

$query = mysqli_query($conn, "select * from product");

while($row = mysqli_fetch_assoc($query)) {
  $data[] = $row;
}

$result = json_encode($data);

echo $result;