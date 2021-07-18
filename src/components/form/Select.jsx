import { useField } from "formik";

export const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="mt-2" htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="alert alert-danger mt-1">{meta.error}</div>
      ) : null}
    </>
  );
};