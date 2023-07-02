import { useState, ChangeEvent } from "react";

export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);
  

  const handleChange = (event : ChangeEvent<HTMLInputElement>): void => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    console.log(value);
  };
  return {values, setValues, handleChange };
  
  
};
