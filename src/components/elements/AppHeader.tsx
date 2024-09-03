import styles from './AppHeader.module.scss';
import React, { useCallback } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
    text: string;
}

function AppHeader(props: AppHeaderProps) {
    const navigate = useNavigate();
    const goBack = useCallback(() => navigate("/Main"), [])

    return (
        <div className={styles.Rectangle}>
            <Button className={styles.BackButton} variant='text' onClick={goBack}>Назад</Button>
            <Typography className={styles.HeaderText} variant="h4">{props.text}</Typography>
        </div>
    );
}

export default AppHeader;
