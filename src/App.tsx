import styles from './App.module.scss';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import AuthorizationPage from './components/AuthorizationPage';
import RegistrationPage from './components/RegistrationPage';
import AccountPage from './components/AccountPage';
import SearchPage from './components/SearchPage';
import PaymentPage from './components/PaymentPage';
import ReservationsPage from './components/ReservationsPage';
import { User } from './components/types/User';
import { setUser } from './root/rootSlice';
import { useDispatch } from 'react-redux';
import AdminPage from './components/AdminPage';
import { getUserReservationsAction } from './root/sagas/plannerSagasActions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const initialValue = JSON.parse(saved);
      dispatch(setUser(initialValue as User));
      dispatch(getUserReservationsAction());
    }

  }, [])

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={< MainPage />} />
        <Route path="/Main" element={< MainPage />} />
        <Route path="/Authorization" element={< AuthorizationPage />} />
        <Route path="/Registration" element={< RegistrationPage />} />
        <Route path="/Account" element={< AccountPage />} />
        <Route path="/Search" element={< SearchPage />} />
        <Route path="/Payment/:amountToPay" element={< PaymentPage />} />
        <Route path="/Reservations" element={< ReservationsPage />} />
        <Route path="/Admin" element={< AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
