// Assignment 5: Create an OTP Login Component

import { useRef, useState, createContext, useContext } from "react";

// Context for OTP functionality
const OTPContext = createContext({});

// Custom hook for OTP context
const useOTP = () => {
  const context = useContext(OTPContext);
  if (!context) {
    throw new Error("useOTP must be used within OTPProvider");
  }
  return context;
};

// Single OTP Input Field
const OTPSlot = ({ index }) => {
  const { otp, inputRefs, handleChange, handleKeyDown, handlePaste } = useOTP();

  return (
    <input
      type="text"
      maxLength={1}
      value={otp[index] || ""}
      ref={(element) => (inputRefs.current[index] = element)}
      onChange={(e) => handleChange(e.target, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onPaste={handlePaste}
      className="otp-input"
      style={{
        width: "var(--otp-input-size)",
        height: "var(--otp-input-size)",
        border: "var(--otp-input-border)",
        borderRadius: "0.5rem",
        fontSize: "1.5rem",
        textAlign: "center",
        outline: "none",
        transition: "all 0.2s ease",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--otp-input-focus-color)";
        e.target.style.boxShadow = "0 0 0 2px rgba(0, 123, 255, 0.25)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#ccc";
        e.target.style.boxShadow = "none";
      }}
    />
  );
};

// OTP Input Group
const OTPGroup = ({ length = 6 }) => {
  return (
    <div
      className="flex gap-2"
      style={{
        "--otp-input-size": "3rem",
        "--otp-input-border": "2px solid #ccc",
        "--otp-input-focus-color": "#007bff",
      }}
    >
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <OTPSlot key={index} index={index} />
        ))}
    </div>
  );
};

// Submit Button
const OTPSubmitButton = ({ onSubmit }) => {
  const { otp } = useOTP();

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      onClick={() => onSubmit(otp.join(""))}
    >
      Verify OTP
    </button>
  );
};

// Main OTP Provider Component
const OTPProvider = ({ children, onComplete }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!value.match(/^[0-9a-zA-Z]$/)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Check if OTP is complete
    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
    if (index === 5 && value) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);

    if (!pasteData.match(/^[0-9a-zA-Z]+$/)) return;

    const otpArray = pasteData.split("").slice(0, 6);
    const newOtp = [...otp];

    otpArray.forEach((value, index) => {
      newOtp[index] = value;
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = value;
      }
    });

    setOtp(newOtp);
    if (inputRefs.current[otpArray.length - 1]) {
      inputRefs.current[otpArray.length - 1].focus();
    }
  };

  const value = {
    otp,
    setOtp,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
  };

  return <OTPContext.Provider value={value}>{children}</OTPContext.Provider>;
};

// Main OTP Input Component
const OTPInput = ({ onComplete }) => {
  const handleSubmit = (otp) => {
    console.log("Submitting OTP:", otp);
    onComplete?.(otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <OTPProvider onComplete={onComplete}>
        <div className="flex flex-col items-center gap-4">
          <OTPGroup length={6} />
          <OTPSubmitButton onSubmit={handleSubmit} />
        </div>
      </OTPProvider>
    </div>
  );
};

export default OTPInput;
