import { Typography, TextField, Button, Grid, Avatar } from '@mui/material';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import StyledGrid from '../common/StyledGrid';
import StyledPaper from '../common/StyledPaper';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);

    const form = useForm({
        defaultValues: {
            username: currentUser?.username,
            email: currentUser?.email,
            password: '',
        },
        mode: 'onTouched',
    });
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;
    const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
        if (isEditable) {
            reset({
                username: currentUser?.username,
                email: currentUser?.email,
                password: '',
            });
        }
        setIsEditable((prev) => !prev);
    };

    const onSubmit = async (formData) => {
        try {
        } catch (error) {}
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
                            Profile
                        </Typography>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '5px 0px',
                            }}
                        >
                            <Avatar
                                src={currentUser?.profilePicture}
                                sx={{ width: 70, height: 70 }}
                            />
                        </div>
                        <TextField
                            label='User Name'
                            id='username'
                            fullWidth
                            margin='normal'
                            disabled={!isEditable}
                            variant={isEditable ? 'outlined' : 'standard'}
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
                            disabled={!isEditable}
                            variant={isEditable ? 'outlined' : 'standard'}
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

                        {isEditable && (
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
                        )}

                        {!isEditable ? (
                            <>
                                <Button
                                    variant='contained'
                                    color='warning'
                                    fullWidth
                                    type='button'
                                    style={{ marginTop: '16px' }}
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant='contained'
                                    color='error'
                                    fullWidth
                                    type='button'
                                    style={{ marginTop: '16px' }}
                                >
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant='contained'
                                    color='warning'
                                    fullWidth
                                    type='button'
                                    style={{ marginTop: '16px' }}
                                >
                                    Update
                                </Button>

                                <Button
                                    variant='contained'
                                    color='info'
                                    fullWidth
                                    type='button'
                                    style={{ marginTop: '16px' }}
                                    onClick={handleEditClick}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </form>
                </StyledPaper>
            </Grid>
        </StyledGrid>
    );
};

export default Profile;
