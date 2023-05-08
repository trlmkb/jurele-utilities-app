import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const MonthlyUtilities = ({ user }) => {
  const [utilities, setUtilities] = useState([]);

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

  const groupByMonth = (utilities) => {
    const grouped = utilities.reduce((acc, item) => {
      const monthYear = new Date(item.date).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      acc[monthYear] = acc[monthYear] || [];
      acc[monthYear].push(item);
      return acc;
    }, {});

    return Object.entries(grouped);
  };

  const monthlyUtilities = groupByMonth(utilities);

  return (
    <ul>
      {monthlyUtilities.map(([monthYear, items]) => (
        <li key={monthYear}>
          <Link to={`/month/${encodeURIComponent(monthYear)}`}>
            {monthYear}
          </Link>
          {items.map((item) => {
            console.log(item);
          })}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(MonthlyUtilities);
