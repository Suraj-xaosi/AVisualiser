// components/themeCustomise.tsx
"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme, resetTheme, ThemeState } from "@/store/slices/themeSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";
import { themePresets } from "@/store/themes";
import { setBarCount } from "@/store/slices/barCounSlice";

const FIELDS: [keyof ThemeState, string][] = [
  ["visualizerBgColor", "Visualiser Background"],
  ["visualizerBarColor", "Visualiser Bar Color"],
  ["sidebarBgColor", "Sidebar Background"],
  ["textColor", "Sidebar/Text Color"],
  ["buttonBgColor", "Button Background"],
  ["listColor", "List Background"],
  ["listTextColor", "List Text Color"],
  ["popupBgColor", "Popup Background"],
  ["popupTextColor", "Popup Text Color"],
  ["popupButtonColor", "Popup Button Color"],
];

export default function ThemeCustomise() {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(theme);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setTheme(form));
    dispatch(setShowCustomise(false));
  };

  const handleReset = () => {
    dispatch(resetTheme());
    dispatch(setShowCustomise(false));
  };

  const applyPreset = (presetTheme: ThemeState) => {
    setForm(presetTheme);
    dispatch(setTheme(presetTheme));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-purple-200 max-h-[90vh] overflow-y-auto"
      style={{ background: theme.popupBgColor + "F2", color: theme.popupTextColor }}
    >
      <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: theme.popupButtonColor }}>
        Customize Theme
      </h3>

      <div className="mb-6">
        <p className="text-sm font-medium mb-2 opacity-80">Presets</p>
        <div className="flex flex-wrap gap-2">
          {themePresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.theme)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition hover:scale-105 focus:outline-none focus-visible:ring-2"
              style={{
                background: preset.theme.buttonBgColor,
                color: preset.theme.textColor,
                borderColor: preset.theme.buttonBgColor,
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {FIELDS.map(([key, label]) => (
          <label key={key} className="flex flex-col gap-1 font-medium">
            {label}
            <input
              type="color"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-12 h-8 rounded self-start focus:outline-none focus-visible:ring-2"
            />
          </label>
        ))}
      </div>

      <div className="p-4">
        <label htmlFor="barcount" className="block mb-2 font-medium">
          Bar Count:
        </label>

        <select
          id="barcount"
          name="barcount"
          onChange={(e) => dispatch(setBarCount( e.target.value ))}
          className="border p-2 rounded"
        >
          <option value="low">low</option>
          <option value="high">high</option>
        </select>
      </div>


      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="submit"
          style={{ background: theme.popupButtonColor, color: theme.textColor }}
          className="flex-1 px-4 py-2 rounded-lg font-semibold shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{ background: theme.popupButtonColor + "CC", color: theme.textColor }}
          className="flex-1 px-4 py-2 rounded-lg font-semibold shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
