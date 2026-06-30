import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

export default function KeycodeInspector() {
  const { dark } = useTheme();

  const [eventData, setEventData] = useState({
    key: "Press any key",
    code: "-",
    keyCode: "-",
    location: "-",
    ctrl: false,
    shift: false,
    alt: false,
    meta: false,
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target.tagName;

      if (
        target === "INPUT" ||
        target === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      setEventData({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode || e.which,
        location:
          e.location === 0
            ? "Standard"
            : e.location === 1
            ? "Left"
            : e.location === 2
            ? "Right"
            : "Numpad",
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey,
      });

      setHistory((prev) => [
        {
          key: e.key,
          code: e.code,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 10));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const Card = ({ title, value }) => (
    <div
      className={`rounded-xl border p-4 ${
        dark
          ? "bg-zinc-900 border-zinc-700"
          : "bg-white border-zinc-300"
      }`}
    >
      <p className="text-sm opacity-70">{title}</p>

      <p className="mt-2 text-lg font-bold break-all">
        {value}
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen p-6 ${
        dark
          ? "bg-zinc-950 text-white"
          : "bg-white text-black"
      }`}
    >
      <Link
        to="/devutilities"
        className="inline-block mb-6 px-4 py-2 rounded-xl border"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold">
        Keyboard Keycode Inspector
      </h1>

      <p className="opacity-70 mt-2">
        Press any key to inspect keyboard events.
      </p>

      <div
        className={`mt-8 rounded-2xl border p-10 text-center ${
          dark
            ? "bg-zinc-900 border-zinc-700"
            : "bg-zinc-50 border-zinc-300"
        }`}
      >
        <p className="text-sm opacity-70">
          event.keyCode
        </p>

        <h2 className="text-7xl font-black mt-3">
          {eventData.keyCode}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <Card title="Key" value={eventData.key} />
        <Card title="Code" value={eventData.code} />
        <Card title="Location" value={eventData.location} />
        <Card title="KeyCode" value={eventData.keyCode} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          ["Ctrl", eventData.ctrl],
          ["Shift", eventData.shift],
          ["Alt", eventData.alt],
          ["Meta", eventData.meta],
        ].map(([name, active]) => (
          <div
            key={name}
            className={`rounded-xl border p-4 text-center font-semibold transition ${
              active
                ? "bg-green-500 text-white border-green-500"
                : dark
                ? "bg-zinc-900 border-zinc-700"
                : "bg-white border-zinc-300"
            }`}
          >
            {name}
          </div>
        ))}
      </div>
            <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Keyboard Layout
        </h2>

     <div className="grid grid-cols-10 gap-2">
  {[
    { label: "Esc", code: "Escape" },
    { label: "1", code: "Digit1" },
    { label: "2", code: "Digit2" },
    { label: "3", code: "Digit3" },
    { label: "4", code: "Digit4" },
    { label: "5", code: "Digit5" },
    { label: "6", code: "Digit6" },
    { label: "7", code: "Digit7" },
    { label: "8", code: "Digit8" },
    { label: "9", code: "Digit9" },
    { label: "0", code: "Digit0" },
    { label: "⌫", code: "Backspace" },

    { label: "Tab", code: "Tab" },
    { label: "Q", code: "KeyQ" },
    { label: "W", code: "KeyW" },
    { label: "E", code: "KeyE" },
    { label: "R", code: "KeyR" },
    { label: "T", code: "KeyT" },
    { label: "Y", code: "KeyY" },
    { label: "U", code: "KeyU" },
    { label: "I", code: "KeyI" },
    { label: "O", code: "KeyO" },
    { label: "P", code: "KeyP" },

    { label: "Caps", code: "CapsLock" },
    { label: "A", code: "KeyA" },
    { label: "S", code: "KeyS" },
    { label: "D", code: "KeyD" },
    { label: "F", code: "KeyF" },
    { label: "G", code: "KeyG" },
    { label: "H", code: "KeyH" },
    { label: "J", code: "KeyJ" },
    { label: "K", code: "KeyK" },
    { label: "L", code: "KeyL" },

    { label: "Shift", code: "ShiftLeft" },
    { label: "Z", code: "KeyZ" },
    { label: "X", code: "KeyX" },
    { label: "C", code: "KeyC" },
    { label: "V", code: "KeyV" },
    { label: "B", code: "KeyB" },
    { label: "N", code: "KeyN" },
    { label: "M", code: "KeyM" },

    { label: "Ctrl", code: "ControlLeft" },
    { label: "Alt", code: "AltLeft" },
    { label: "Space", code: "Space" },
    { label: "Meta", code: "MetaLeft" },
    { label: "Enter", code: "Enter" },
  ].map((key) => {
    const active = eventData.code === key.code;

    return (
      <div
        key={key.code}
        className={`rounded-lg border px-3 py-3 text-center text-sm font-medium transition-all ${
          active
            ? "bg-blue-500 text-white border-blue-500 scale-105"
            : dark
            ? "bg-zinc-900 border-zinc-700"
            : "bg-white border-zinc-300"
        }`}
      >
        {key.label}
      </div>
    );
  })}
</div>
</div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Last 10 Key Events
        </h2>

        <div
          className={`rounded-xl border overflow-hidden ${
            dark
              ? "border-zinc-700"
              : "border-zinc-300"
          }`}
        >
          {history.length === 0 ? (
            <div className="p-6 text-center opacity-70">
              Press any key...
            </div>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-5 py-3 border-b last:border-none ${
                  dark
                    ? "border-zinc-800"
                    : "border-zinc-200"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    {item.key}
                  </p>

                  <p className="text-sm opacity-70">
                    {item.code}
                  </p>
                </div>

                <span className="text-sm opacity-70">
                  {item.time}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    
  );
}