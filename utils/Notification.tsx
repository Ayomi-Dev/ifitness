// components/NotificationModal.tsx
import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";

type NotificationModalProps = {
  show: boolean;
  type?: "success" | "error" | "info";
  message: string;
  onClose: () => void;
};

const iconStyles = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-blue-500",
};

const icons = {
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  info: AiOutlineInfoCircle,
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  show,
  type = "info",
  message,
  onClose,
}) => {
  if (!show) return null;

  const Icon = icons[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center relative">
        {/* Icon */}
        <Icon className={`w-12 h-12 mx-auto mb-4 ${iconStyles[type]}`} />

        {/* Message */}
        <p className="text-gray-800 text-lg font-medium">{message}</p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
