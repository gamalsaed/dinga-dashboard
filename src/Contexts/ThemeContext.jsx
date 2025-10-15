import { createContext, useState } from "react";

export const Theme = createContext({
  dark: "",
  setDark: () => {},
});

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const ctx = {
    dark,
    setDark,
  };
  return <Theme value={ctx}>{children}</Theme>;
}
