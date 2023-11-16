import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const Input = ({
    label,
    type,
    name,
    control,
    error,
    helperText,
    required,
    validation,
}) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <TextField
                label={label}
                fullWidth
                type={type}
                helperText={error ? helperText : ''}
                error={error}
                margin='normal'
                required={required}
                {...field}
                inputProps={{
                    pattern: validation,
                }}
            />
        )}
    />
);

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    validation: PropTypes.string, // Add a validation prop for custom validation patterns
};

export default Input;
