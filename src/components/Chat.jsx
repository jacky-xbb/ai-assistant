import { useState, useEffect } from 'react';
import Header from './Header';
import Message from './Message';
import ChatBox from './ChatBox';
import robotAvatar from '../assets/robot-avatar.png';
import userAvatar from '../assets/profile.jpg';
import { chain } from '../utils/chain';
import { formatConvHistory } from '../utils/formatConvHistory';

function Chat() {
  const [messages, setMessages] = useState(() => {
    // Retrieve messages from local storage if available
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save texts of messages to local storage whenever messages change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleNewMessage = async (text) => {
    const newMessage = {
      time: new Date().toLocaleTimeString(),
      text,
      avatarSrc: userAvatar,
      avatarAlt: "User's avatar",
      position: "left",
      isRobot: false,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const updatedMessages = [...messages, newMessage];

    setIsLoading(true);

    try {
      const response = await chain.invoke({
        question: text,
        conv_history: formatConvHistory(updatedMessages.map(msg => msg.text)),
      });

      const aiMessage = {
        time: new Date().toLocaleTimeString(),
        text: response,
        avatarSrc: robotAvatar,
        avatarAlt: "Robot's avatar",
        position: "right",
        isRobot: true,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="font-merriweather px-10 py-8 mx-auto w-full bg-sky-950 max-w-[480px] h-screen">
      <Header
        mainIconSrc={robotAvatar}
        mainIconAlt="Main icon"
        title="AI-Assistant"
      />
      <div id="chatbot-conversation-container" className="flex flex-col gap-y-2 mt-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            time={message.time}
            text={message.text}
            avatarSrc={message.avatarSrc}
            avatarAlt={message.avatarAlt}
            position={message.position}
            isRobot={message.isRobot}
          />
        ))}
      </div>
      <div className="mt-auto mb-4">
        <ChatBox
          label="What's happening?"
          buttonText="Ask"
          onSubmit={handleNewMessage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

export default Chat;
