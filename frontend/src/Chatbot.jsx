import { useState } from "react";
import { getChatbotResponse } from "./openapi";
import "./Chatbot.css";

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [category, setCategory] = useState(null); // Canteen or CC

    // Function to handle user messages
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput("");

        // Get AI Response based on selected category
        const botResponse = await getChatbotResponse(category, input);
        setMessages(prevMessages => [...prevMessages, userMessage, { text: botResponse, sender: "bot" }]);
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h2>Chatbot</h2>
                <button onClick={onClose} className="close-btn">✖</button>
            </div>

            <div className="chat-window">
                {/* Ask for category selection if not selected */}
                {!category ? (
                    <div className="category-selection">
                        <p>What would you like to inquire about?</p>
                        <button onClick={() => setCategory("canteen")}>🍽️ Canteen</button>
                        <button onClick={() => setCategory("cc")}>📄 CC (Xerox Shop)</button>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.sender}`}>
                            <span>{msg.text}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Show input only after category selection */}
            {category && (
                <div className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
