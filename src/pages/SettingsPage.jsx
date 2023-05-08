import { useState, useEffect } from 'react';
import { db } from '../firebase';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    smtpServer: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    receiverEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection('settings').doc('emailSettings').set(settings);
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('settings')
      .doc('emailSettings')
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setSettings(snapshot.data());
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container settings-page">
      <h2>Email Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="smtpServer">SMTP Server:</label>
          <input
            type="text"
            name="smtpServer"
            value={settings.smtpServer}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="smtpPort">SMTP Port:</label>
          <input
            type="number"
            name="smtpPort"
            value={settings.smtpPort}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="smtpUsername">SMTP Username:</label>
          <input
            type="text"
            name="smtpUsername"
            value={settings.smtpUsername}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="smtpPassword">SMTP Password:</label>
          <input
            type="password"
            name="smtpPassword"
            value={settings.smtpPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="receiverEmail">Receiver Email:</label>
          <input
            type="email"
            name="receiverEmail"
            value={settings.receiverEmail}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SettingsPage;
