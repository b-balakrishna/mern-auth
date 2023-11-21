import { Typography, TextField, Button, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import StyledGrid from '../common/StyledGrid';
import StyledPaper from '../common/StyledPaper';
import StyledLink from '../common/StyledLink';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            console.log(formData);
            const response = await axios.post(
                'http://localhost:5000/api/auth/signup',
                formData
            );
            console.log(response);
            toast.success(response?.data?.message);
            setLoading(false);
            navigate('/sign-in');
        } catch (error) {
            debugger;
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
                    <form onSubmit={onSubmit}>
                        <Typography variant='h5' gutterBottom align='center'>
                            Sign Up
                        </Typography>

                        <TextField
                            label='User Name'
                            id='username'
                            fullWidth
                            margin='normal'
                            onChange={handleChange}
                        />

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
                            {loading ? 'Loading...' : 'Sign Up'}
                        </Button>

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
