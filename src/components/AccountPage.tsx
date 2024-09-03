import styles from './Account.module.scss';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppHeader from './elements/AppHeader';
import { Button, Switch, TextField, Typography } from '@mui/material';
import { getUser, setUser, setUserDelayNotificationOn } from '../root/rootSlice';
import { updateUserAction } from '../root/sagas/plannerSagasActions';
import { User } from './types/User';

export const emailFormat = new RegExp('^[\\w\\W]+@[\\w\\W]+\\.[\\w\\W]+$');
export const phoneFormat = new RegExp('^[+]*([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)([0-9][ -]*)$');

function AccountPage() {

    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorText, setErrorText] = useState("");

    const [phone, setPhone] = useState(user?.phone);
    const [email, setEmail] = useState(user?.email);
    const [newPassword, setNewPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const delayNotificationOn = useMemo(() => user === undefined ? false : user?.delayNotification, [user]);

    const updateUser = useCallback(() => {
        if (!email || !emailFormat.test(email)) {
            setErrorText("Некорректный email");
            return;
        }
        if (!phone || !phoneFormat.test(phone)) {
            setErrorText("Некорректный номер телефона");
            return;
        }
        if (newPassword !== repeatedPassword) {
            setErrorText("Пароли не совпадают");
            return;
        }
        if ((newPassword === repeatedPassword || newPassword === "") && user) {
            const updatedUser = {
                id: user?.id,
                phone: phone,
                email: email,
                password: newPassword === "" ? user.password : newPassword,
                delayNotification: delayNotificationOn
            } as User;
            dispatch(updateUserAction(updatedUser))
        }
        navigate(`/Main`);
    }, [user, phone, email, newPassword, repeatedPassword, dispatch, navigate, updateUserAction])

    const signOut = useCallback(() => {
        dispatch(setUser(undefined));
        localStorage.setItem("user", "");
        navigate(`/Main`);
    }, [dispatch, navigate, setUser])

    const notificationDelayChange = useCallback(() => {
        dispatch(setUserDelayNotificationOn(!delayNotificationOn));
    }, [delayNotificationOn])

    return (
        <div className={styles.FullScreen}>
            <div className={styles.InnerComponent}>
                <AppHeader text='Личный кабинет' />
                <div className={styles.InformationHolder}>
                    <div className={styles.HeaderRow}>
                        <Typography className={styles.Header} variant="h4" >Личные данные</Typography>
                        <Button className={styles.HeaderButton} onClick={updateUser}>Сохранить</Button>
                    </div>
                    <div className={styles.InformationRow}>
                        <Typography className={styles.Name} variant="h5">Номер телефона</Typography>
                        <TextField className={styles.TextField} type="text" variant="filled" onChange={e => setPhone(e.target.value)} value={phone} />
                    </div>
                    <div className={styles.InformationRow}>
                        <Typography className={styles.Name} variant="h5">Электронная почта</Typography>
                        <TextField className={styles.TextField} type="email" variant="filled" onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className={styles.InformationRow}>
                        <Typography className={styles.Name} variant="h5">Новый пароль</Typography>
                        <TextField className={styles.TextField} type="password" variant="filled" onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <div className={styles.InformationRow}>
                        <Typography className={styles.Name} variant="h5">Повторите пароль</Typography>
                        <TextField className={styles.TextField} type="password" variant="filled" onChange={e => setRepeatedPassword(e.target.value)} />
                    </div>
                </div>
                <div className={styles.InformationHolder}>
                    <div className={styles.HeaderRow}>
                        <Typography className={styles.Header} variant="h4" >Уведомления</Typography>
                    </div>
                    <div className={styles.InformationRow}>
                        <Typography className={styles.Name} variant="h5">Задержанный транспорт</Typography>
                        <Switch className={styles.Switch} onChange={notificationDelayChange} checked={delayNotificationOn} />
                    </div>
                </div>
                <div className={styles.ButtonContainer}>
                    <Button className={styles.SignOutButton} onClick={signOut}>ВЫЙТИ</Button>
                    <Typography className={styles.ErrorLabel} variant="h5" >{errorText}</Typography>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
