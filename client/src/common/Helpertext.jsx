import { Typography } from '@mui/material';

const Helpertext = ({ helperText }) => {
    return (
        <>
            <Typography color='error'>{helperText || ''}</Typography>
        </>
    );
};
export default Helpertext;
