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
function loadMessage() {
  $("#messageList").show();
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
}
function displayMessage(messages) {
  var messageList = $("#messageList");
  messageList.empty();
  $.each(messages, function (index, message) {
    var messageDiv = $("<div>").html(`
        <p>ID: ${message.id}</p>
        <p>Name: ${message.name}</p>
        <p>Body: ${message.body}</p>
        <button type="button" class="editBtn" onclick="editMessage(${message.id})">Edit</button>
        <button type="button" class="deleteBtn" onclick="deleteMessage(${message.id})">Delete</button>
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
      $.each(response, function (index, message) {
        if (message.id == id) {
          $("#messageList").hide();
          const form = $("<form></form>");
          form.attr("id", "editForm");
          form.html(`
            <h3>Edit message</h3>
            <label>Name </label>
            <input type="text" placeholder="Name" id="edit-name" value="${message.name}" />
            <label>Body </label>
            <input type="text" placeholder="Message" id="edit-body" value="${message.body}" />
            <button type="submit">Save</button>
          `);
          $("#edit_form_container").append(form);
          $("#editForm").on("submit", (e) => {
            e.preventDefault();
            const name = $("#edit-name").val();
            const body = $("#edit-body").val();
            const formData = { id, name, body };
            $.ajax("apii.php", {
              type: "PUT",
              data: formData,
              success: () => {
                $("#editForm").remove();
                loadMessage();
              },
            });
          });
        }
      });
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
