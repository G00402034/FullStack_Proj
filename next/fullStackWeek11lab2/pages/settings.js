import { useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.className = e.target.value;
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        Theme:
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  );
};

export default Settings;
