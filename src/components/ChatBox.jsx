import { useState } from "react";
import PropTypes from "prop-types";

const inputStyles = "w-full px-4 pt-4 pb-4 mt-2 text-base leading-5 bg-sky-900 rounded-xl border-4 border-solid shadow-sm border-slate-600 text-gray-100 resize-none";
const buttonStyles = "w-full px-6 py-3 mt-3 text-2xl font-bold text-center text-white whitespace-nowrap rounded-xl bg-slate-600 hover:bg-slate-700 hover:translate-y-0.5 focus:outline-none "
const buttonDisabledStyles = "w-full px-6 py-3 mt-3 text-2xl font-bold text-center text-white whitespace-nowrap rounded-xl bg-slate-600 opacity-50 cursor-not-allowed";


function ChatBox({ label, buttonText, onSubmit, isLoading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <section className="flex flex-col mt-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chatInput" className="sr-only">{label}</label>
        <input
          id="chatInput"
          placeholder={label}
          className={inputStyles}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className={isLoading ? buttonDisabledStyles : buttonStyles}
          disabled={isLoading}
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}

ChatBox.propTypes = {
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ChatBox;

