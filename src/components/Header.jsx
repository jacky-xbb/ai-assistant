import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

function Header({ mainIconSrc, mainIconAlt, title }) {
  return (
    <header className="flex flex-col mx-auto items-center grow shrink-0 basis-0 w-fit">
      <Avatar src={mainIconSrc} alt={mainIconAlt} className="aspect-square w-[129px]" />
      <h1 className="mt-3 text-4xl text-center text-stone-200">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  mainIconSrc: PropTypes.string.isRequired,
  mainIconAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
