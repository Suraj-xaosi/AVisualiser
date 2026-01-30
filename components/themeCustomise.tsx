import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme, resetTheme } from "@/store/slices/themeSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";

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
    setForm(theme);
    dispatch(setShowCustomise(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-purple-200"
      style={{ background: theme.popupBgColor + 'F2', color: theme.popupTextColor }}
    >
      <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: theme.popupButtonColor }}>Customize Theme</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <label className="flex flex-col gap-1 font-medium">
          Visualiser Background
          <input type="color" name="visualizerBgColor" value={form.visualizerBgColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Visualiser Bar Color
          <input type="color" name="visualizerBarColor" value={form.visualizerBarColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Sidebar Background
          <input type="color" name="sidebarBgColor" value={form.sidebarBgColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Sidebar/Text Color
          <input type="color" name="textColor" value={form.textColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Button Background
          <input type="color" name="buttonBgColor" value={form.buttonBgColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          List Background
          <input type="color" name="listColor" value={form.listColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          List Text Color
          <input type="color" name="listTextColor" value={form.listTextColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Popup Background
          <input type="color" name="popupBgColor" value={form.popupBgColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Popup Text Color
          <input type="color" name="popupTextColor" value={form.popupTextColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>

        <label className="flex flex-col gap-1 font-medium">
          Popup Button Color
          <input type="color" name="popupButtonColor" value={form.popupButtonColor} onChange={handleChange} className="w-12 h-8 rounded self-start" />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="submit"
          style={{ background: theme.popupButtonColor, color: theme.textColor }}
          className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-indigo-500 transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{ background: theme.popupButtonColor + 'CC', color: theme.textColor }}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
