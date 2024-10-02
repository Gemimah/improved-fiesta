$(document).ready(function () {
  $("#scriptt").submit(function (e) {
    e.preventDefault();
    var name = $("input[name='name']").val();
    var message = $("input[message='message']").val();

    $.ajax({
      url: "apii.php",
      method: "POST",
      data: {
        name: name,
        message: message,
      },
      success: function (response) {
        console.log(response);
        $("input[name='name']").val("");
        $("input[message='message']").val("");
      },
    });
  });
  $("body").on("click", ".delete", function () {
    var $this = $(this);
    var id = $this.closest("tr").attr("data-id");
    var name = $this.parents("tr").attr("data-name");
    var message = $this.parents("tr").attr("data-message");

    $.ajax({
      url: "apii.php",
      method: "DELETE",
      data: {
        name: name,
        message: message,
      },
      success: function (response) {
        $this.parents("tr").remove();
      },
    });
  });
  // Search functionality
  $("#search").on("input", function () {
    var searchTerm = $(this).val().toLowerCase();
    $(".table tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
    });
  });
  // Pagination
  var itemsPerPage = 5; // Adjust as needed
  var currentPage = 1;
  function showPage(page) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    $(".table tbody tr").hide().slice(startIndex, endIndex).show();
  }
  function updatePaginationButtons() {
    $("#prevPage").prop("disabled", currentPage === 1);
    $("#nextPage").prop(
      "disabled",
      currentPage * itemsPerPage >= $(".table tbody tr").length
    );
  }
  // Initial page display
  showPage(currentPage);
  updatePaginationButtons();
  // Previous Page
  $("#prevPage").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
      updatePaginationButtons();
    }
  });
  // Next Page
  $("#nextPage").on("click", function () {
    var totalPages = Math.ceil($(".table tbody tr").length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
      updatePaginationButtons();
    }
  });
  // Your existing code for fetching data ...
  $("body").on("click", ".edit", function () {
    var $this = $(this);
    var $tr = $this.closest("tr");
    var name = $tr.attr("data-name");
    var message = $tr.attr("data-message");

    $tr
      .find("td:eq(0)")
      .html("<input name='edit_text'class='name' value='" + name + "'>");
    $tr
      .find("td:eq(1)")
      .html(
        "<input name='edit_message'class='message' value='" + message + "'>"
      );
    $tr
      .find("td:eq(3)")
      .prepend("<button type='button' class='update'>Update</button>");
  });
  $("body").on("click", ".update", function () {
    var $tr = $(this).closest("tr");
    var id = $tr.attr("data-id");
    var name = $("input[name='edit_text']").val();
    var message = $("input[message='edit_message']").val();
    $.ajax({
      url: "apii.php",
      method: "PUT",
      data: {
        id: id,
        name: name,
        message: message,
      },
      success: function (response) {
        console.log(response);
      },
    });
  });
  $("body").on("click", ".update", function () {
    var $this = $(this);
    var $tr = $this.closest("tr");
    var id = $tr.attr("data-id");
    var name = $tr.find("input[name='edit_text']").val();
    var message = $tr.find("input[message='edit_message']").val();
    $.ajax({
      url: "apii.php",
      method: "PUT",
      data: {
        id: id,
        name: name,
        message: message,
      },
      success: function (response) {
        $tr.find("td:eq(0)").text(name);
        $tr.find("td:eq(1)").text(message);
        $tr.attr("data-name", name);
        $tr.attr("data-message", message);
        $this.remove();
      },
    });
  });
});

$.ajax("apii.php", {
  type: "GET",
  success: (response) => {
    $.each(response, (idx, user) => {
      $("#messageList").append(
        `<tr
          data-name='${user.name}'
          data-id='${user.id}'
          data-message='${user.message}''
         >
          <td>${user.name}</td>
          <td>${user.message}</td>
          <td><button class='delete' type='button'>Delete</button><button class='edit' type='button'>Edit</button></td>
        </tr>`
      );
    });
  },
});
