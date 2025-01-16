// Assignment 2: Create a background color changer
import { useState, memo, useCallback } from "react";

// type definitions
type Colors = {
  name: string;
  value: string;
};

type ColorToolbarProps = {
  onColorChange: (color: string) => void;
};

// Background Colors
const bg_colors: Colors[] = [
  { name: "red", value: "#ff0000" },
  { name: "green", value: "#00ff00" },
  { name: "blue", value: "#0000ff" },
  { name: "yellow", value: "#ffff00" },
  { name: "purple", value: "#800080" },
  { name: "cyan", value: "#00ffff" },
  { name: "white", value: "#ffffff" },
];

// ColorToolbar Component
const ColorToolbar = memo(({ onColorChange }: ColorToolbarProps) => {
  console.log("ColorToolbar rendered"); // For demonstration purposes

  return (
    <div className="fixed bottom-2 p-4 rounded-lg shadow-lg flex justify-center gap-4 bg-gray-100">
      {bg_colors.map((bg_color) => (
        <button
          key={bg_color.name}
          className="px-4 py-2 rounded border-none cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundColor: bg_color.value }}
          onClick={() => onColorChange(bg_color.value)}
        >
          {bg_color.name}
        </button>
      ))}
    </div>
  );
});

// Main BgChanger Component
function BgChanger() {
  console.log("BgChanger rendered"); // For demonstration purposes

  const [color, setColor] = useState("white");

  const handleColorChange = useCallback((color: string) => {
    setColor(color);
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <ColorToolbar onColorChange={handleColorChange} />
    </div>
  );
}

export default BgChanger;
