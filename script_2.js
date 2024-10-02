document.addEventListener("DOMContentLoaded", function () {
    loadMessage();
    document.getElementById('addForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addMessage();
    });
});
function loadMessage() {
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                displayMessage(JSON.parse(xhr.responseText));
            } else {
                console.error('Failed to load message.');
            }
        }
    };
    xhr.open('GET', 'apii.php', true);
    xhr.send();
}
function displayMessage(message) {
    var messageList = document.getElementById('messageList');
    messageList.innerHTML = '';
    message.forEach(function (message) {
        
        console.log(message)
        var messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <p>ID: ${message.id}</p>
            <p>Name: ${message.name}</p>
            <p>Body: ${message.body}</p>
            
            <button onclick="editMessage(${message.id})">Edit</button>
            <button onclick="deleteMessage(${message.id})">Delete</button>
            <hr>
        `;
        messageList.appendChild(messageDiv);
    });
}    
{/* <p>Type: ${message.type}</p> */}
function addMessage() {
    var name = document.getElementById('name').value;
    var body = document.getElementById('body').value;
   
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadMessage();
            } else {
                console.error('Failed to add student.');
            }
        }
    };
    xhr.open('POST', 'apii.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('name=' + name + '&body=' + body);
}
function editMessage(id) {
    
}
function deleteMessage(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadMessage();
            } else {
                console.error('Failed to delete student.');
            }
        }
    };
    xhr.open('DELETE', 'apii.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}

















document.addEventListener("DOMContentLoaded", function () {
    loadMessage();
    document.getElementById('addForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addMessage();
    });
});
function loadMessage() {
    // Ajax request to get message
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                displayMessage(JSON.parse(xhr.responseText));
            } else {
                console.error('Failed to load message.');
            }
        }
    };
    xhr.open('GET', 'apii.php', true);
    xhr.send();
}
function displayMessage(message) {
    var messageList = document.getElementById('messageList');
    messageList.innerHTML = '';
    message.forEach(function (message) {
        
        console.log(message)
        var messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <p>ID: ${message.id}</p>
            <p>Name: ${message.name}</p>
            <p>Body: ${message.body}</p>
            <button onclick="editMessage(${message.id})">Edit</button>
            <button onclick="deleteMessage(${message.id})">Delete</button>
            <hr>
        `;
        messageList.appendChild(messageDiv);
    });
}    
{/* <p>Type: ${message.type}</p> */}
function addMessage() {
    var name = document.getElementById('name').value;
    var body = document.getElementById('body').value;
   
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadMessage();
            } else {
                console.error('Failed to add message.');
            }
        }
    };
    xhr.open('POST', 'apii.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('name=' + name + '&body=' + body);
}
function editMessage(id) {
    var name =document.getElementById("updatedname").value;
    var message=document.getElementById("message").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadMessage();
            } else {
                console.error('Failed to edit.');
            }
        }
    };
}
function deleteMessage(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadMessage();
            } else {
                console.error('Failed to delete message.');
            }
        }
    };
    xhr.open('DELETE', 'apii.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('id=' + id);
}




