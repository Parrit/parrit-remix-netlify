import React from "react";
import "~/styles/footer.css";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="fake-copyright">© Parrit 2025</div>
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
