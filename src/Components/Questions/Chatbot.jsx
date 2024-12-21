import { useState, useRef, useEffect } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [prompt, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA6shX0RPR24EVjsVOJEucMbudxnxgDkqw"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (prompt.trim()) {
      // Add user message to the conversation
      setMessages((prev) => [...prev, { text: prompt, sender: "user" }]);

      // Clear input field
      setUserInput("");

      try {
        // Send user input to the Gemini API and get a response
        const result = await model.generateContent(prompt);

        const botResponse =
          result?.response.candidates[0].content.parts[0].text ||
          "I'm sorry, I couldn't process your request.";

        // Add bot response to the conversation
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      } catch (error) {
        console.error("Error with Gemini API:", error);

        // Handle errors gracefully
        setMessages((prev) => [
          ...prev,
          {
            text: "Something went wrong. Please try again later.",
            sender: "bot",
          },
        ]);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg w-80 sm:w-96 max-h-[70vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-primary text-tertiary p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-tertiary font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#c2dfe3]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-primary text-tertiary"
                      : "bg-[#9db4c0] text-white"
                  } p-3 rounded-lg max-w-xs`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white flex items-center border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#9db4c0]"
              placeholder="Type a message..."
              value={prompt}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-primary text-tertiary px-4 py-2 rounded-lg hover:bg-[#9db4c0] hover:text-primary transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button with Text */}
      {!isOpen && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-tertiary p-4 rounded-full shadow-lg hover:bg-[#9db4c0] hover:text-primary flex items-center transition-all duration-300"
          >
            <BiSolidMessageRounded className="text-xl" />
            <span className="text-sm sm:text-base font-medium hidden sm:block px-4 py-2 rounded-xl">
              Ask for Medical Assistance
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
