import {
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import StyledGrid from '../common/StyledGrid';
import StyledPaper from '../common/StyledPaper';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../firebase';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
} from '../redux/user/userSlice';

const Profile = () => {
    const { currentUser, loading } = useSelector((state) => state.user);

    const form = useForm({
        defaultValues: {
            username: currentUser?.username,
            email: currentUser?.email,
            password: currentUser?.password || '',
        },
        mode: 'onTouched',
    });
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;
    const [isEditable, setIsEditable] = useState(false);
    const fileRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadPercent, setUploadPercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openSignoutDialog, setOpenSignoutDialog] = useState(false);
    const dispatch = useDispatch();

    const handleEditClick = (e) => {
        e.preventDefault();
        if (isEditable) {
            reset({
                username: currentUser?.username,
                email: currentUser?.email,
                password: '',
            });
        }
        setIsEditable((prev) => !prev);
    };

    useEffect(() => {
        if (selectedImage) {
            handleFileUpload(selectedImage);
        }
    }, [selectedImage]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setUpdatedData({
                        ...updatedData,
                        profilePicture: downloadUrl,
                    });
                    toast.success('Image uploaded Successfully');
                });
            }
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpdateUser = async (formData, e) => {
        try {
            formData.profilePicture = updatedData?.profilePicture;
            dispatch(updateUserStart());
            e.preventDefault();
            const response = await axios.post(
                `http://localhost:5000/api/user/update/${currentUser._id}`,
                formData,
                { withCredentials: true }
            );
            if (response.status === 200) {
                dispatch(updateUserSuccess(response.data?.data));
                return toast.success(response?.data?.message);
            }
            dispatch(updateUserFailure(response));
            return toast.error('Error updating user');
        } catch (error) {
            dispatch(updateUserFailure(error));
            return toast.error('Error updating user');
        }
    };

    const handleDialogClose = () => {
        setOpenDeleteDialog(false);
        setOpenSignoutDialog(false);
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const response = await axios.delete(
                `http://localhost:5000/api/user/delete/${currentUser._id}`,
                { withCredentials: true }
            );
            if (response.status === 204) {
                dispatch(deleteUserSuccess(response.data?.data));
                return toast.success(response?.data?.message);
            }
            dispatch(deleteUserFailure());
            return toast.error('Error deleting user');
        } catch (error) {
            dispatch(deleteUserFailure());
            return toast.error('Error deleting user');
        }
    };

    const handleSignOut = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/signout');
            dispatch(signOut());
            toast.success('Sign out successfully');
        } catch (error) {
            toast.error('Error Signing out');
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
                    <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
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
                            <input
                                type='file'
                                ref={fileRef}
                                accept='image/*'
                                hidden
                                onChange={handleImageChange}
                            />
                            <IconButton
                                style={{
                                    cursor: isEditable ? 'pointer' : 'default',
                                }}
                                onClick={() =>
                                    isEditable && fileRef.current.click()
                                }
                            >
                                <Avatar
                                    src={
                                        updatedData?.profilePicture ||
                                        currentUser?.profilePicture
                                    }
                                    sx={{ width: 70, height: 70 }}
                                />
                            </IconButton>
                        </div>
                        {imageError ? (
                            <Typography color='red' align='center'>
                                Error Uploading Image (File size should be less
                                than 2MB)
                            </Typography>
                        ) : uploadPercent === 0 ||
                          uploadPercent === 100 ? null : (
                            <Typography color='green' align='center'>
                                Uploading Image {uploadPercent}%
                            </Typography>
                        )}
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
                                    onClick={() => setOpenDeleteDialog(true)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    type='button'
                                    style={{ marginTop: '16px' }}
                                    onClick={() => setOpenSignoutDialog(true)}
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant='contained'
                                    color='warning'
                                    fullWidth
                                    type='submit'
                                    style={{ marginTop: '16px' }}
                                    disabled={loading}
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
            <PopupDialog
                openDialog={openDeleteDialog}
                handleDialogClose={handleDialogClose}
                handleFunction={handleDelete}
                context={
                    'Are you sure you want to permanently delete your account?'
                }
            />
            <PopupDialog
                openDialog={openSignoutDialog}
                handleDialogClose={handleDialogClose}
                handleFunction={handleSignOut}
                context={'Are you sure you want to SignOut?'}
            />
        </StyledGrid>
    );
};

export default Profile;

export const PopupDialog = ({
    openDialog,
    handleDialogClose,
    handleFunction,
    context,
}) => {
    return (
        <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>{context}</DialogTitle>

            <DialogActions>
                <Button onClick={handleDialogClose}>No</Button>
                <Button onClick={handleFunction} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};
