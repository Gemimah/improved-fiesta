<?php
$server="localhost";
$username="root";
$password="";
$db="message_db";
$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');
// Check the request type
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        
        $result = $conn->query("SELECT * FROM message");
        $message = array();
        while ($row = $result->fetch_assoc()) {
            $message[] = $row;
        }
        echo json_encode($message);
        break;
    case 'POST':
        
        parse_str(file_get_contents("php://input"), $_POST);
        $name= $_POST['name'];
        $message= $_POST['message'];
        $conn->query("INSERT INTO message (name, message) VALUES ('$name', '$message',)");
        echo json_encode(array('status' => 'success'));
        break;
    case 'PUT':
        // Update client  details
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $name = $_PUT['name'];
        $message = $_PUT['message'];
        $conn->query("UPDATE message SET name='$Name', message='$message', WHERE id=$id");
        echo json_encode(array('status' => ' Inserted successfully'));
        break;
       
       case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
$conn->query("DELETE FROM message WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
}
    $conn->close();
?>


