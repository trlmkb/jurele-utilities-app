import { useState } from 'react';
import { db } from '../firebase';
import Tesseract from 'tesseract.js';

const UtilitiesForm = ({ user }) => {
  const [utilityData, setUtilityData] = useState({
    date: '',
    hotWater: '',
    coldWater: '',
    heatingUpstairs: '',
    heatingDownstairs: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUtilityData({ ...utilityData, [name]: value });
  };

  const [ocrInProgress, setOcrInProgress] = useState(false);
  const [ocrMeter, setOcrMeter] = useState('');

  const handleFileChange = async (e, meter) => {
    setOcrInProgress(true);
    setOcrMeter(meter);

    try {
      const file = e.target.files[0];
      const {
        data: { text },
      } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log(m),
      });

      setUtilityData({ ...utilityData, [meter]: text });
    } catch (error) {
      console.error('OCR Error:', error);
    } finally {
      setOcrInProgress(false);
      setOcrMeter('');
    }
  };

  const handleFileCancel = (meter) => {
    setUtilityData({ ...utilityData, [meter]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('utilities').add({
        ...utilityData,
        userId: user.uid,
        createdAt: new Date(),
      });
      setUtilityData({ type: '', value: '', date: '' });
    } catch (error) {
      console.error('Error adding utility data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Date input */}

      {['hotWater', 'coldWater', 'heatingUpstairs', 'heatingDownstairs'].map(
        (meter) => (
          <div key={meter}>
            <label htmlFor={meter}>
              {meter.charAt(0).toUpperCase() + meter.slice(1)}:
            </label>
            <input
              type="number"
              id={meter}
              name={meter}
              value={utilityData[meter]}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              id={`${meter}-file`}
              name={`${meter}-file`}
              accept="image/*"
              onChange={(e) => handleFileChange(e, meter)}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => document.getElementById(`${meter}-file`).click()}
            >
              Take Photo
            </button>
            {utilityData[meter] && (
              <button type="button" onClick={() => handleFileCancel(meter)}>
                Cancel
              </button>
            )}
            {ocrInProgress && ocrMeter === meter && (
              <span>OCR in progress...</span>
            )}
          </div>
        )
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UtilitiesForm;
