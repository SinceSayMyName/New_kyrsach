import styles from './Authorization.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authorizeUserAction, getUserReservationsAction } from '../root/sagas/plannerSagasActions';
import { getUser } from '../root/rootSlice';

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

function AuthorizationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(getUser);

  const authorize = useCallback(async () => {
    dispatch(authorizeUserAction({ login: login, password: password }));
  }, [dispatch, authorizeUserAction, getUserReservationsAction, login, password])

  useEffect(() => {
    if (user) {
      dispatch(getUserReservationsAction());
      localStorage.setItem("user", JSON.stringify(user));
      setErrorMessage("");
      navigate(`/Main`);
    } else if (user === null) {
      setErrorMessage("Пользователь не найден")
    }
  }, [user])

  const toRegistration = useCallback(() => {
    navigate(`/Registration`);
  }, [])

  return (
    <div className={styles.FullScreen}>
      <Typography className={styles.Typography} variant="h4">Доступ к информационной системе междугородних поездок</Typography>
      <Typography className={styles.Typography} variant="h3">Вход в систему</Typography>
      <div className={styles.Table}>
        <div className={styles.OptionRow}>
          <Typography className={styles.Label} variant="h5">E-mail</Typography>
          <TextField type='email' className={styles.TextField} onChange={e => setLogin(e.target.value)} />
        </div>
        <div className={styles.OptionRow}>
          <Typography className={styles.Label} variant="h5">Пароль</Typography>
          <TextField className={styles.TextField} type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <Typography className={styles.ErrorLabel} variant="h5">{errorMessage}</Typography>
      </div>
      <Button className={styles.PrimaryButton} onClick={authorize}>ВОЙТИ</Button>
      <Button className={styles.TextButton} variant='text' onClick={toRegistration}>Еще нет аккаунта? Зарегистрироваться</Button>
    </div>
  );
}

export default AuthorizationPage;
