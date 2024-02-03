import { Typography, TextField, Button, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import StyledGrid from '../common/StyledGrid';
import StyledPaper from '../common/StyledPaper';
import StyledLink from '../common/StyledLink';
import { useNavigate } from 'react-router-dom';
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../common/OAuth';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        try {
            dispatch(signInStart());
            e.preventDefault();
            console.log(formData);
            const response = await axios.post('/api/auth/signin', formData, {
                withCredentials: true,
            });
            toast.success(response?.data?.message);
            dispatch(signInSuccess(response?.data?.data));
            navigate('/');
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.error
                : error.message;
            toast.error(message);
            dispatch(signInFailure(message));
        }
    };
    return (
        <StyledGrid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
        >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <StyledPaper elevation={3}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h5' gutterBottom align='center'>
                            Sign In
                        </Typography>

                        <TextField
                            label='Email Address'
                            id='email'
                            fullWidth
                            type='email'
                            helperText={
                                <Typography
                                    style={{ color: 'red', fontSize: '.75rem' }}
                                    textAlign='center'
                                >
                                    Please enter a valid email address
                                </Typography>
                            }
                            margin='normal'
                            onChange={handleChange}
                        />

                        <TextField
                            label='Password'
                            id='password'
                            fullWidth
                            type='password'
                            helperText='Please enter a valid password'
                            margin='normal'
                            onChange={handleChange}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            fullWidth
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Sign In'}
                        </Button>
                        <OAuth />
                        <Typography
                            variant='body2'
                            align='center'
                            style={{ marginTop: '16px' }}
                        >
                            {"Don't have an account?"}
                            <StyledLink to='/sign-up'> Sign up here</StyledLink>
                        </Typography>
                    </form>
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
};

export default Login;
