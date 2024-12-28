import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import ReactDOM from "react-dom";
import parritIcon from "~/styles/images/parrit-head.svg";
import closeSytemIcon from "~/styles/images/close-modal-dark.svg";

export const BannerView: React.FC = () => {
  const { nextBanner, acknowledgeBanner } = useContext(ProjectContext);
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  if (!nextBanner) {
    // nothing to render
    return null;
  }

  return ReactDOM.createPortal(
    <div>
      <div className="ReactModal__Overlay" />
      <div className="fixed inset-0 flex items-center justify-center z-2">
        <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="form-header">
            <button
              className="form-cancel float-right"
              onClick={() => acknowledgeBanner(nextBanner)}
            >
              <img src={closeSytemIcon} />
            </button>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center justify-center w-3/4 h-48 border-4 border-yellow-200 rounded-full">
              <h2 className="text-5xl font-extrabold text-gray-600 text-center font-overlock">
                {nextBanner.title}
              </h2>
            </div>
            <div className="add-parrit-icon mt-4">
              <img src={parritIcon} alt="Sad Parrit" />
            </div>
          </div>
          <div className="form-body mt-4 w-full">
            {nextBanner.paragraphs.map((p) => (
              <p className="font-raleway font-semibold mb-5" key={hashCode(p)}>
                {p}
              </p>
            ))}
          </div>
          <button
            className="button-red mt-6 px-20 py-4 float-left font-overlock text-2xl font-bold"
            onClick={() => {
              // open window to nextBanner.action_url
              window.open(nextBanner.action_url, "_blank");
              acknowledgeBanner(nextBanner);
            }}
          >
            {nextBanner.action_text}
          </button>
          <p className="mt-4 float-left">
            Have questions or interested in volunteering? Send a note to:{" "}
            <a
              href="mailto:parrithelp@gmail.com"
              className="text-blue-500 underline"
            >
              parrithelp@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

// generate hash from sentence
function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}
