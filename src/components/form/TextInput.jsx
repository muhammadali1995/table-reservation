import { useField } from "formik";
import { isUndefined } from "lodash";
import { FormHelperText, TextField } from '@material-ui/core'
export const TextInput = ({...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField  error={!isUndefined(meta.error) && meta.touched} variant='filled' {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormHelperText className="text-red-600">{meta.error}</FormHelperText>
      ) : null}
    </>
  );
};
