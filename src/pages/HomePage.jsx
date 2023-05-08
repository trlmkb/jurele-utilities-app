import UtilitiesForm from '../components/UtilitiesForm';
import MonthlyUtilities from '../components/MonthlyUtilities';
import { auth } from '../firebase';

const HomePage = () => {
  const user = auth.currentUser;

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <UtilitiesForm user={user} />
      <MonthlyUtilities user={user} />
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default HomePage;
