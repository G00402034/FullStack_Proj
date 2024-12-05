import { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    // Fetch the theme from localStorage
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme); // Initialize with the stored theme
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.body.className = newTheme; // Apply the theme to the body
    localStorage.setItem('theme', newTheme); // Persist the theme in localStorage
  };

  return (
    <div className={`settingsContainer ${theme}`}>
      <div className="settingsHeader">
        <h1 className="settingsTitle">Settings</h1>
        <div className="themeSelector">
          <label htmlFor="theme" className="formLabel">
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className="formSelect"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
