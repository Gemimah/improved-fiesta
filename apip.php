<?php
$server="localhost";// $sername="127.0.0.1";
$username="root";
$password="";
$db="message";
// Connect to the database
$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Set content type to JSON
header('Content-Type: application/json');
// Check the request type
$method = $_SERVER['REQUEST_METHOD'];
// CRUD operations
switch ($method) {
    case 'GET':
        // Retrieve student details
        $result = $conn->query("SELECT * FROM message");
        $message = array();
        while ($row = $result->fetch_assoc()) {
            $message[] = $row;
        }
        echo json_encode($message);
        break;
    case 'POST':
        // Add a new message

        $name = $_POST['name'];
        $message= $_POST['message'];
        $priority= $_POST['priority'];
        $type=$_POST['type'];
        $terms=$_POST['terms'];
        $conn->query("INSERT INTO message (name, message, priority, type, terms) VALUES ('$name', '$message', '$priority','$type','$terms')");
        echo json_encode(array('status' => 'success'));
        break;
    case 'PUT':
        // Update message details
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $name = $_PUT['name'];
        $message = $_PUT['message'];
        $priority= $_PUT['priority'];
        $type=$_PUT['type'];
        $terms=$_PUT['terms'];
        $conn->query("UPDATE message SET name='$name', message='$message', priority='$priority' , type='$type', terms='$terms' WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
    case 'DELETE':
        // Delete a student
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];
        $conn->query("DELETE FROM message WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
}
$conn->close();
?>