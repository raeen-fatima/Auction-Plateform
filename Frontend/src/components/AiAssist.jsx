import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import axios from "axios";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setMessages([...messages, { sender: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ai/ask`,
        { message: userMessage }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error fetching AI response", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn't understand that." },
      ]);
    } finally {
      setIsTyping(false);
      setUserMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {/* Floating AI Button */}
      <button
        onClick={toggleAssistant}
        className="fixed bottom-10 right-10 p-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
      >
        <FaRobot size={20} />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-32 right-8 w-76 h-[22rem] bg-white shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden">
          <h2 className="text-xl font-bold bg-blue-100 text-blue-800 py-4 px-6 border-b border-gray-200">
            BidNest AI Assistant
          </h2>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-[80vh]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-xs text-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm text-gray-500 italic">BidNest AI is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
