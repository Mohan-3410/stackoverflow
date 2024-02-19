import React, { useState } from "react";
import "./ChatBots.css"
import { axiosClient } from "../../utils/axiosClient";
import Markdown from "react-markdown"
const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const userMessage = {
                role: "user",
                content: prompt,
            };
            const newMessages = [...messages, userMessage];

            setIsLoading(true);

            const response = await axiosClient.post("/bot/chat", {
                messages: newMessages,
            });

            setMessages([...newMessages, response.data]);
            setPrompt("");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="conversation-container">
            <div className="conversation-header">
                <h1>Ask Question with AI</h1>
                <p>Best AI chatbot for Question and Answer</p>
            </div>
            <div className="conversation-content">
                <div className="conversation-form">
                    <form
                        onSubmit={onSubmit}
                        className="conversation-form-grid"
                    >
                        <div className="form-input">
                            <input
                                disabled={isLoading}
                                placeholder="Type technical questions here..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                        <button className="form-button">Ask</button>
                    </form>
                </div>
                <div className="conversation-messages">
                    {isLoading && (
                        <div className="loading-message">
                            AI is thinking...
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div className="empty-message">
                            No conversation started
                        </div>
                    )}
                    <div className="message-list">
                        {messages.map((message, index) => (
                            <div
                                className={`message ${message.role === "user" ? "user-message" : "bot-message"}`}
                                key={index}
                            >
                                <Markdown>
                                    {message.content || ""}
                                </Markdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
