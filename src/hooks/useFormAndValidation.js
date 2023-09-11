import { useState, useCallback } from 'react';

export function useFormAndValidation(inputValues) {

  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  function emailValidation({ name, value }) {
    if (name === 'email') {
      const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regEx.test(value)) {
        setIsValid(false)
        value === '' ? setErrors({ ...errors, [name]: 'Вы пропустили это поле' }) : setErrors({ ...errors, [name]: 'Неверный адрес электронной почты' });
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
    emailValidation({ name, value })
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

