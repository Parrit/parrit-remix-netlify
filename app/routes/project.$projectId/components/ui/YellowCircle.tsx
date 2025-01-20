import clsx from "clsx";

type Size = "large" | "medium" | "small";

interface Props {
  text: string;
  size: Size;
}

export const YellowCircle: React.FC<Props> = (props) => {
  let sizeClass = "text-5xl";
  let heightClass = "h-48";
  let maxWidthClass: string | null = null;
  switch (props.size) {
    case "medium":
      sizeClass = "text-3xl";
      break;
    case "small":
      sizeClass = "text-xl";
      heightClass = "h-36";
      maxWidthClass = "max-w-60";
      break;
    case "large":
    default:
      sizeClass = "text-5xl";
      heightClass = "h-48";
      maxWidthClass = null;
      break;
  }
  const textClassName = clsx(
    sizeClass,
    "font-extrabold",
    "text-gray-600",
    "text-center",
    "font-overlock",
    "whitespace-pre-line"
  );

  const divClassname = clsx(
    heightClass,
    maxWidthClass,
    "flex",
    "items-center",
    "justify-center",
    "w-3/4",
    "border-4",
    "border-yellow-200",
    "bg-white"
  );
  return (
    <div className={divClassname} style={{ borderRadius: "100%" }}>
      <p className={textClassName}>{props.text}</p>
    </div>
  );
};
