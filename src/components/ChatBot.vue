<template>
    <div :class="['bot-chat', { 'is-open': isOpen }]" class="fixed bottom-4 right-4 w-96">
        <div v-if="!isOpen" class="grid justify-end">
            <button @click="toggleChat" class="btn btn-circle btn-outline">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 640 512">
                    <path
                        d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
                </svg>
            </button>
        </div>
        <div v-if="isOpen" class="chat-content rounded-md border-2 bg-white">
            <div class="chat-header grid justify-items-end">
                <button @click="toggleChat" class="btn btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div id="messages" ref="chatMessages" class=" overflow-auto h-96">
                <div v-for="message in chatMessages" :key="message.id">
                    <div v-if="message.role !== 'user'" class="chat chat-start">
                        <div class="chat-bubble text-left chat-bubble-primary">{{ message.content }}</div>
                    </div>
                    <div v-if="message.role === 'user'" class="chat chat-end">
                        <div class="chat-bubble text-left chat-bubble-success">{{ message.content }}</div>
                    </div>
                </div>
            </div>
            <form id="message-form" @submit.prevent="sendMessage">
                <input class="text-black" v-model="newMessage" id="message-input" type="text" autocomplete="off"
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
            if (this.isOpen) {
                this.$nextTick(() => {
                    const chatMessagesDiv = this.$refs.chatMessages;
                    if (chatMessagesDiv) {
                        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
                    }
                });
            }
        },
        sendMessage() {
            if (this.newMessage.trim()) {
                this.displayMessage('user', this.newMessage);
                this.socket.emit('sendMessage', this.newMessage, (error) => {
                    if (error) {
                        alert(error);
                    } else {
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
            this.chatMessages.push({
                id: Date.now() + 1,
                role: 'assistant',
                content: ''
            });
            localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
            this.$nextTick(() => {
                const chatMessagesDiv = this.$refs.chatMessages;
                if (chatMessagesDiv) {
                    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
                }
            });
        },
        concatMessage(message) {
            this.chatMessages[this.chatMessages.length - 1].content += message;
            localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
            this.$nextTick(() => {
                const chatMessagesDiv = this.$refs.chatMessages;
                if (chatMessagesDiv) {
                    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
                }
            });
        }
    },
    mounted() {
        this.socket = io.connect(API_URL);
        this.socket.on('message', (message) => {
            if (message !== '[DONE]') {
                this.concatMessage(message);
                console.log(message);
            }
        });
        if (localStorage.getItem('chatMessages')) {
            this.chatMessages = JSON.parse(localStorage.getItem('chatMessages'));
        } else {
            localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
        }
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
  