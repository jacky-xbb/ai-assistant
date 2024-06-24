import PropTypes from "prop-types";
import Avatar from "./Avatar";

const avatarStyles = "rounded-full shrink-0 self-end aspect-square w-[47px]";
const messageTimeStyles = "self-center mt-5 text-xs font-bold leading-4 text-slate-600";

function Message({ text, time, avatarSrc, avatarAlt, position, isRobot }) {

  const messageTextStyles = `text-sm leading-4 rounded-xl p-3 mt-2 ${isRobot ? "bg-sky-50 black-800" : "bg-cyan-800 text-white"
    } font-merriweather`; // Apply Merriweather font

  return (
    <section className={`flex gap-2 ${position === 'left' ? 'justify-start' : 'justify-end'} items-center`}>
      {position === 'left' && <Avatar src={avatarSrc} alt={avatarAlt} className={avatarStyles} />}
      <div className="flex flex-col grow shrink-0 basis-0 w-fit">
        {time && <time className={messageTimeStyles}>{time}</time>}
        <p className={messageTextStyles}>{text}</p>
      </div>
      {position === 'right' && <Avatar src={avatarSrc} alt={avatarAlt} className={avatarStyles} />}
    </section>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.string,
  avatarSrc: PropTypes.string.isRequired,
  avatarAlt: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  isRobot: PropTypes.bool.isRequired,
};

export default Message;

