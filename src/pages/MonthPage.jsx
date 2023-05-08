import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useFunctions } from 'react-firebaseui';

const MonthPage = ({ user }) => {
  const { monthYear } = useParams();
  const [utilities, setUtilities] = useState([]);

  const sendEmailFunction = useFunctions().httpsCallable('sendEmail');

  const handleSendEmail = () => {
    const subject = `Utility Readings for XXX`;
    const text = `Hot Water: XXX\nCold Water: XXX\nHeating Upstairs: XXX\nHeating Downstairs: XXX`;

    sendEmailFunction({
      receiver: 'trlmkb.spam.bank@gmail.com',
      subject,
      text,
    }).then((result) => {
      if (result.data.success) {
        alert('Email sent successfully');
      } else {
        alert('Error sending email');
      }
    });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('utilities')
      .where('userId', '==', user.uid)
      .orderBy('date', 'desc')
      .onSnapshot((snapshot) => {
        const fetchedUtilities = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUtilities(fetchedUtilities);
      });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const filteredUtilities = utilities.filter((utility) => {
    const utilityMonthYear = new Date(utility.date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    return utilityMonthYear === monthYear;
  });

  return (
    <div>
      <h2>{decodeURIComponent(monthYear)}</h2>
      <ul>
        {filteredUtilities.map((utility) => (
          <li key={utility.id}>
            Hot Water: {utility.hotWater}, Cold Water: {utility.coldWater},
            Heating Upstairs: {utility.heatingUpstairs}, Heating Downstairs:{' '}
            {utility.heatingDownstairs}
          </li>
        ))}
      </ul>
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default MonthPage;
