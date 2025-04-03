"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { marked } from "marked"; // Import the marked library to parse markdown
import { Loader2, Send, Trash } from "lucide-react";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem("chatHistory");
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  // Function to save chat history to localStorage
  const saveChatHistory = (chats: { sender: string; text: string }[]) => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChatHistory = [...chatHistory, { sender: "You", text: message }];
    setChatHistory(newChatHistory);
    setMessage("");
    setLoading(true);
    saveChatHistory(newChatHistory);

    // Show a typing animation instead of text
    const thinkingMessage = {
      sender: "Gemini",
      text: "<div class='typing-indicator'><span></span><span></span><span></span></div>",
    };
    setChatHistory([...newChatHistory, thinkingMessage]);

    try {
      let response;

      if (message.toLowerCase().includes("explain shortly")) {
        const lastResponse = chatHistory.find(
          (chat) => chat.sender === "Gemini"
        );
        if (!lastResponse)
          throw new Error("No previous response found for short explanation.");

        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Please explain this shortly: ${lastResponse.text}`,
          }),
        });
      } else {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unknown API error");

      const formattedMessage = data.message
        ? marked(data.message)
        : "No response received.";
      const finalMessage =
        typeof formattedMessage === "string" ? formattedMessage : "";

      // Replace typing animation with actual response
      const updatedChatHistory = [
        ...newChatHistory,
        { sender: "Gemini", text: finalMessage },
      ];
      setChatHistory(updatedChatHistory);
      saveChatHistory(updatedChatHistory);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory([
        ...newChatHistory,
        { sender: "Gemini", text: "Error fetching response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]); // Clear chat state
    localStorage.removeItem("chatHistory"); // Remove from localStorage
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Chat Messages */}
      <div className="flex flex-col gap-3 overflow-auto h-[60vh] lg:h-[70vh] p-3 border rounded-lg bg-gray-200 dark:bg-slate-900">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`p-2 max-w-[75%] rounded-md ${
              chat.sender === "You"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-300 dark:bg-gray-700"
            }`}
            dangerouslySetInnerHTML={{
              __html: chat.sender === "Gemini" ? chat.text : chat.text, // No "You:"
            }}
          />
        ))}
      </div>

      {/* Input Field & Buttons */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="p-[6px] w-full border rounded-md dark:bg-gray-800"
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-sm"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
        <Button
          onClick={clearChat}
          className="bg-red-500 text-white rounded-sm"
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
