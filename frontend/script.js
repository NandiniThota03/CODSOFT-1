async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="message user-message">${userInput}</div>`;

    try {
        // Send user input to backend
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Display bot response
        chatBox.innerHTML += `<div class="message bot-message">${data.response}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div class="message bot-message">Error: ${error.message}</div>`;
    } finally {
        document.getElementById('user-input').value = '';
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
}
