import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const UtilitiesList = ({ user }) => {
  const [utilities, setUtilities] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('utilities')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
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

  return (
    <ul>
      {utilities.map((utility) => (
        <li key={utility.id}>
          {utility.type}: {utility.value} - {utility.date}
        </li>
      ))}
    </ul>
  );
};

export default UtilitiesList;
