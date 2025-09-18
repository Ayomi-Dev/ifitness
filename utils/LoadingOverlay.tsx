// components/LoadingOverlay.tsx
import React from "react";
import Spinner from "./Spinner";

type LoadingOverlayProps = {
  show: boolean;
  message?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <Spinner size="lg" />
        {message && (
          <p className="mt-4 text-white text-lg font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
