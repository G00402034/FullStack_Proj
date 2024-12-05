import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Settings = () => {
  const [theme, setTheme] = useState('light'); // Default theme
  const router = useRouter();

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
      <h1 className="heading">Settings</h1>
      <div className="settingsGroup">
        <label className="formLabel">
          Theme:
          <select value={theme} onChange={handleThemeChange} className="formSelect">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div className="buttonGroup">
        <button
          className="button"
          onClick={() => router.push('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Settings;
