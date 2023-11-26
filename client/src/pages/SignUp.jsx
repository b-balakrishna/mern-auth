import { Typography, TextField, Button, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StyledGrid from '../common/StyledGrid';
import StyledPaper from '../common/StyledPaper';
import StyledLink from '../common/StyledLink';
import { useNavigate } from 'react-router-dom';
import OAuth from '../common/OAuth';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        mode: 'onTouched',
    });
    const { register, handleSubmit, formState, control } = form;
    const { errors } = formState;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            debugger;
            setLoading(true);
            e.preventDefault();
            const response = await axios.post(
                'http://localhost:5000/api/auth/signup',
                formData
            );
            console.log(response);
            toast.success(response?.data?.message);
            setLoading(false);
            navigate('/sign-in');
        } catch (error) {
            const { message } = error?.response?.data;
            setLoading(false);
            toast.error(message);
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
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Typography variant='h5' gutterBottom align='center'>
                            Sign Up
                        </Typography>

                        <TextField
                            label='User Name'
                            id='username'
                            fullWidth
                            margin='normal'
                            {...register('username', {
                                required: 'User Name is Required',
                            })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />

                        <TextField
                            label='Email Address'
                            id='email'
                            fullWidth
                            type='email'
                            margin='normal'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        'Please enter a valid email address',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label='Password'
                            id='password'
                            fullWidth
                            type='password'
                            margin='normal'
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    message:
                                        'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number',
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Button
                            variant='contained'
                            color='primary'
                            fullWidth
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Sign Up'}
                        </Button>
                        <OAuth />
                        <Typography
                            variant='body2'
                            align='center'
                            style={{ marginTop: '16px' }}
                        >
                            Already have an account?
                            <StyledLink to='/sign-in'> Log in here</StyledLink>
                        </Typography>
                    </form>
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
};

export default SignUp;
