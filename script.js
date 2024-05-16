function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        displayMessage("User", userInput);
        // Send the user message to the backend for processing
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        })
        .then(response => response.text())
        .then(data => {
            // Display the response from the backend
            displayMessage("Chatbot", data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // Clear the input field
        document.getElementById("user-input").value = "";
    }
}

function displayMessage(sender, message) {
    var chatContainer = document.getElementById("chat-container");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
    chatContainer.appendChild(messageElement);
    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
