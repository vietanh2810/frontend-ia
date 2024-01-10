<template>
    <div :class="['bot-chat', { 'is-open': isOpen }]">
        <button @click="toggleChat" class="btn-chat">
            <!-- Icon or text for the chat button -->
            Chat
        </button>
        <div v-if="isOpen" class="chat-content">
            <div id="messages">
                <div v-for="message in chatMessages" :key="message.id">
                    <p><b>{{ message.role === 'user' ? 'You' : 'Assistant' }}:</b> {{ message.content }}</p>
                </div>
            </div>
            <form id="message-form" @submit.prevent="sendMessage">
                <input v-model="newMessage" id="message-input" type="text" autocomplete="off"
                    placeholder="Type a message...">
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';


const API_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
    data() {
        return {
            isOpen: false,
            newMessage: '',
            chatMessages: [],
            socket: null,
        };
    },
    methods: {
        toggleChat() {
            this.isOpen = !this.isOpen;
        },
        sendMessage() {
            if (this.newMessage.trim()) {
                this.displayMessage('user', this.newMessage);
                this.socket.emit('sendMessage', this.newMessage, (error) => {
                    if (error) {
                        alert(error);
                    } else {
                        console.log('Message delivered!');
                        this.newMessage = '';
                    }
                });
            }
        },
        displayMessage(role, message) {
            this.chatMessages.push({
                id: Date.now(),
                role,
                content: message
            });
        }
    },
    mounted() {
        this.socket = io.connect(API_URL);
        this.socket.on('message', (message) => {
            this.displayMessage('assistant', message);
        });
    }
};
</script>
  
<style scoped>
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

#chat-container {
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

#messages {
    height: 300px;
    overflow-y: auto;
    padding: 10px;
}

#message-form {
    display: flex;
    padding: 10px;
}

#message-input {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 6px 12px;
    margin-left: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
  