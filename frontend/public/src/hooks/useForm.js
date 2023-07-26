import { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    setValues(evt.target.value);
  };

  return {
    values,
    onChange: handleChange,
    setValues,
  };
}

export default useForm;
