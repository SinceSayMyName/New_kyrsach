import styles from './Registration.module.scss';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateUserAction } from '../root/sagas/plannerSagasActions';
import { User } from './types/User';

export const emailFormat = new RegExp('^[\\w\\W]+@[\\w\\W]+\\.[\\w\\W]+$');

function RegistrationPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState("");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const register = useCallback(() => {
    if (!email || !emailFormat.test(email)) {
      setErrorText("Некорректный email");
      return;
    }
    if (!newPassword || newPassword.length <= 0) {
      setErrorText("Укажите пароль");
      return;
    }
    if (newPassword !== repeatedPassword) {
      setErrorText("Пароли не совпадают");
      return;
    }
    if (newPassword === repeatedPassword) {
      dispatch(
        updateUserAction({
          email: email,
          password: newPassword,
          delayNotification: true
        } as User));
    }
    navigate(`/Main`);
  }, [dispatch, navigate, updateUserAction, email, newPassword, repeatedPassword])

  const toAuthorization = useCallback(() => {
    navigate(`/Authorization`);
  }, [navigate])

  return (
    <div className={styles.FullScreen}>
      <Typography className={styles.Typography} variant="h3">Регистрация</Typography>
      <Typography className={styles.Typography} variant="h4">Укажите электронную почту и придумайте пароль для входа</Typography>
      <div className={styles.Table}>
        <div className={styles.OptionRow}>
          <Typography className={styles.Label} variant="h5">E-mail</Typography>
          <TextField type='email' className={styles.TextField} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.OptionRow}>
          <Typography className={styles.Label} variant="h5">Пароль</Typography>
          <TextField type='password' className={styles.TextField} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <div className={styles.OptionRow}>
          <Typography className={styles.Label} variant="h5">Пароль еще раз</Typography>
          <TextField type='password' className={styles.TextField} onChange={e => setRepeatedPassword(e.target.value)} />
        </div>
      </div>
      <Typography className={styles.ErrorLabel} variant="h5" >{errorText}</Typography>
      <Button className={styles.PrimaryButton} onClick={register}>Зарегистрироваться</Button>
      <Button className={styles.TextButton} variant='text' onClick={toAuthorization}>Уже есть аккаунт? Войти</Button>
    </div>
  );
}

export default RegistrationPage;
