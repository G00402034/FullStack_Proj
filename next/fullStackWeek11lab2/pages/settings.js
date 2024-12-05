import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const router = useRouter();

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="settingsContainer">
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
