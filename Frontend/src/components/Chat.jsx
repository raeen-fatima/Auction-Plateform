import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4001", { transports: ["websocket"] });

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => {
        const updatedMessages = [...prev, data];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    socket.on("updateUsers", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateUsers");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r hidden md:block">
        <h3 className="text-lg font-semibold">Online Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="p-2 border-b">{user}</li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-2">Chat</h2>
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg max-w-xs ${
    Math.random() > 0.5 ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
  }`}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex mt-4 p-2 bg-white rounded-lg shadow">
          <input
            type="text"
            className="flex-grow p-2 border rounded-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
