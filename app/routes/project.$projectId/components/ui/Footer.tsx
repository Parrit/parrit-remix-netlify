import React from "react";
import "~/styles/footer.css";
import copyright from "~/styles/images/copyright.svg";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="fake-copyright flex items-center space-x-1">
        <img className="h-2 w-2 inline-block" src={copyright} />
        <span>Parrit 2025</span>
      </div>
      <div className="footer-links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:parrithelp@gmail.com"
        >
          Contact Us
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Parrit/parrit-remix-netlify"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};
