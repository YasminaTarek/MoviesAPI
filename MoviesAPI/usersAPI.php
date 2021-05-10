<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");

$con = mysqli_connect("localhost", "root", "", "recycle");
$response = array();
if ($con){
    $sql = "select * from customer";
    $result = mysqli_query($con, $sql);
    if ($result){
        header("Content-Type: JSON");
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $response[$i]['id'] = $row['id'];
            $response[$i]['first_name'] = $row['first_name'];
            $response[$i]['last_name'] = $row['last_name'];
            $response[$i]['email'] = $row['email'];
            $response[$i]['password'] = $row['password'];
            $response[$i]['address'] = $row['address'];
            $response[$i]['city'] = $row['city'];
            $response[$i]['area'] = $row['area'];
            $response[$i]['zip'] = $row['zip'];
            $response[$i]['phone'] = $row['phone'];
            $response[$i]['image'] = $row['image'];

            $i++;
        }
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}
else {
    echo "database connection failed";
}