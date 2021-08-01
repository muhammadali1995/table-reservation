import { useField } from "formik";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <InputLabel className="mt-2" htmlFor={props.id || props.name}>{label}</InputLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="alert alert-danger mt-1">{meta.error}</div>
      ) : null}
    </>
  );
};