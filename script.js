// const apiKey = '1200b5dd271649ae98e189601a8485af8e5092b1f456fd240c6e1e7c09e86735';
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'User' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getBotResponse(message) {
    try {
        const response = await fetch('https://api.together.xyz/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${"1200b5dd271649ae98e189601a8485af8e5092b1f456fd240c6e1e7c09e86735"}`
            },
            body: JSON.stringify({
                model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
                messages: [{ role: "user", content: message }],
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.7,
                top_k: 50,
                repetition_penalty: 1,
                stop: ["<|eot_id|>"]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        addMessage('Bot', botMessage);
    } catch (error) {
        console.error('Error:', error);
        addMessage('Bot', 'Sorry, I encountered an error.');
    }
}

function handleUserInput() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('User', message);
        userInput.value = '';
        getBotResponse(message);
    }
}

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

sendButton.addEventListener('click', handleUserInput);