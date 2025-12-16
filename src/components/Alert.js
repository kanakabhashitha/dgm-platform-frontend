import { IoMdInformationCircleOutline } from "react-icons/io";
import { GoCheckCircle } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { IoWarningOutline } from "react-icons/io5";

const alertStyles = {
  success: {
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-600",
    icon: GoCheckCircle,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-600",
    icon: RxCrossCircled,
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-600",
    icon: IoWarningOutline,
  },
  info: {
    bg: "bg-sky-100",
    border: "border-sky-300",
    text: "text-sky-600",
    icon: IoMdInformationCircleOutline,
  },
};

const Alert = ({ type = "info", message = "" }) => {
  const style = alertStyles[type] || alertStyles.info;
  const Icon = style.icon;

  return (
    <div
      className={`flex items-center w-full rounded-sm border ${style.bg} ${style.border}`}
    >
      <span className={`px-5 ${style.text}`}>
        <Icon size={30} />
      </span>
      <div className={`flex flex-col py-3 ${style.text}`}>
        <span className="text-base capitalize font-semibold">{type}</span>
        <span className="text-sm normal-case">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
