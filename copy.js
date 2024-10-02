var navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.right = "0";
}
function showMenu() {
  navLinks.style.right = "-200px";
}

$(document).ready(function () {
  loadMessage();

  $("#addForm").submit(function (event) {
    event.preventDefault();
    addMessage();
  });

  // Delegate click event for dynamically added buttons
  $("#messageList").on("click", "button.editBtn", function () {
    var id = $(this).data("id");
    editMessage(id);
  });

  // Delegate click event for dynamically added buttons
  $("#messageList").on("click", "button.deleteBtn", function () {
    var id = $(this).data("id");
    deleteMessage(id);
  });
});
/*function loadMessage() {
  $.ajax({
    url: "apii.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      displayMessage(data);
    },
    error: function () {
      console.error("Failed to load message.");
    },
  });
}*/
(document).ready(function () {
  loadMessage();

  $("#addForm").submit(function (event) {
      event.preventDefault();
      addMessage();
  });

  $("#searchInput").on("input", function () {
      var searchText = $(this).val().toLowerCase();
      filterMessages(searchText);
  });

  // Delegate click event for dynamically added buttons
  $("#messageList").on("click", ".editBtn", function () {
      var id = $(this).data("id");
      editMessage(id);
  });

  $("#messageList").on("click", ".deleteBtn", function () {
      var id = $(this).data("id");
      deleteMessage(id);
  });
});

function displayMessage(messages) {
  var messageList = $("#messageList");
  messageList.empty();

  $.each(messages, function (index, message) {
      var messageRow = $("<tr>").append(
          $("<td>").text(message.name),
          $("<td>").text(message.body),
          $("<td>").append($("<button class='editBtn'>Edit</button>").data("id", message.id)),
          $("<td>").append($("<button class='deleteBtn'>Delete</button>").data("id", message.id))
      );

      messageList.append(messageRow);
  });
}

function displayMessage(messages) {
  var messageList = $("#messageList");
  messageList.empty();

  $.each(messages, function (index, message) {
    var messageDiv = $("<div>").html(`
        <p>ID: ${message.id}</p>
        <p>Name: ${message.name}</p>
        <p>Body: ${message.body}</p>
        <button class="editBtn" data-id="${message.id}">Edit</button>
        <button class="deleteBtn" data-id="${message.id}">Delete</button>
        <hr>
      `);

    messageList.append(messageDiv);
  });
}

function addMessage() {
  var name = $("#name").val();
  var body = $("#body").val();

  $.ajax({
    url: "apii.php",
    method: "POST",
    data: { name: name, body: body },
    success: function () {
      loadMessage();
      $("#name").val("");
      $("#body").val("");
    },
    error: function () {
      console.error("Failed to add message.");
    },
  });
}

function editMessage(id) {
  $.ajax("apii.php", {
    type: "GET",
    dataType: "json",
    error: (error) => {
      console.log("There was an error", error);
    },
    success: (response) => {
      console.log(response);
    },
  });
}

function deleteMessage(id) {
  $.ajax({
    url: "apii.php",
    method: "DELETE",
    data: { id: id },
    success: function () {
      loadMessage();
    },
    error: function () {
      console.error("Failed to delete message.");
    },
  });

}










<?php
$server="localhost";
$username="root";
$password="";
$db="iranzi";
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
        $result = $conn->query("SELECT * FROM dianah");
        $dianah = array();
        while ($row = $result->fetch_assoc()) {
            $dianah[] = $row;
        }
        echo json_encode($dianah);
        break;
    case 'POST':
        // Add a new student
        parse_str(file_get_contents("php://input"), $_POST);
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $conn->query("INSERT INTO dianah (username, email, password) VALUES ('$username', '$email', '$password')");
        echo json_encode(array('status' => 'success'));
        break;
    case 'PUT':
        // Update student details
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $username = $_PUT['username'];
        $email = $_PUT['email'];
        $password = $_PUT['password'];
        $conn->query("UPDATE dianah SET username='$username', email='$email', password='$password' WHERE id=$id");
        echo json_encode(array('status' => ' Inserted successfully'));
        break;
       // Assuming 'id' is the unique identifier for your records
       case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
$conn->query("DELETE FROM dianah ");
        echo json_encode(array('status' => 'success'));
        break;
}
    $conn->close();













    
    <?php
    $server = "localhost";
    $username = "root";
    $password = "";
    $db = "message_db";
    
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
            // Retrieve messages
            $result = $conn->query("SELECT * FROM message");
            $messages = array();
            while ($row = $result->fetch_assoc()) {
                $messages[] = $row;
            }
            echo json_encode($messages);
            break;
    
        case 'POST':
            // Add a new message
            $name = $_POST['name'];
            $body = $_POST['body'];
    
            $conn->query("INSERT INTO message (name, body) VALUES ('$name', '$body')");
            echo json_encode(array('status' => 'success'));
            break;
    
        case 'PUT':
            // Update message
            parse_str(file_get_contents("php://input"), $_PUT);
            $id = $_PUT['id'];
            $name = $_PUT['name'];
            $body = $_PUT['body'];
    
            $conn->query("UPDATE message SET name='$name', body='$body' WHERE id=$id");
            echo json_encode(array('status' => 'success'));
            break;
    
        case 'DELETE':
            // Delete message
            parse_str(file_get_contents("php://input"), $_DELETE);
            $id = $_DELETE['id'];
            $conn->query("DELETE FROM message WHERE id=$id");
            echo json_encode(array('status' => 'success'));
            break;
    }
    
    $conn->close();
    ?>