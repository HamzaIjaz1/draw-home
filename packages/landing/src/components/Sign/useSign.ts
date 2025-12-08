import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loginSearchParam } from '@draw-house/common/dist/constants';
import { validateEmail, validatePassword } from './validation';

const defaultFormData = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const textsForSign = {
  register: {
    title: 'Create account',
    primaryButton: 'Sign Up',
    secondaryButton: 'Continue as a Guest',
    changeSignType: 'Already have an account?',
    changeSignTypeButton: 'Log In',
  },
  login: {
    title: 'Sign In',
    primaryButton: 'Log In',
    secondaryButton: 'Continue as a Guest',
    changeSignType: 'Don’t have an account yet?',
    changeSignTypeButton: 'Sign Up',
  },
};

export type FormData = typeof defaultFormData;
export type FormDataKeys = keyof FormData;
export type SignTypes = 'login' | 'register';
export type LoginSubmit = (p: Pick<FormData, 'email' | 'password'>) => void;
export type RegisterSubmit = (p: FormData, resetForm: () => void) => void;

export const useSign = (loginSubmit: LoginSubmit, registerSubmit: RegisterSubmit) => {
  const searchParams = useSearchParams();
  const [type, setType] = useState<SignTypes>(
    searchParams?.get(loginSearchParam) === '' ? 'login' : 'register',
  );
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<FormDataKeys, string>>>({});

  const onInputChange = (field: FormDataKeys) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const setError = (field: FormDataKeys, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const removeError = (field: FormDataKeys) => {
    setErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  const validateEmailAndParol = () => {
    if(!validateEmail(formData.email)) {
      setError('email', 'Email is not valid');
      return false;
    }
    removeError('email');

    if(!validatePassword(formData.password)) {
      setError('password', 'Password must be longer than 6 characters');
      return false;
    }
    removeError('password');
    return true;
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors({});
  };

  const onSubmit = () => {
    if(type === 'login') {
      if(!validateEmailAndParol()) {
        return;
      }
      loginSubmit({ email: formData.email, password: formData.password });
    } else {
      if(formData.password !== formData.repeatPassword) {
        setError('password', 'Passwords do not match');
        setError('repeatPassword', 'Passwords do not match');
        return;
      }
      removeError('password');
      removeError('repeatPassword');
      if(!validateEmailAndParol()) {
        return;
      }

      registerSubmit(formData, resetForm);
    }
  };

  const toggleSignType = () => {
    setType(prev => (prev === 'login' ? 'register' : 'login'));
    resetForm();
  };

  return {
    type,
    formData,
    errors,
    onInputChange,
    onSubmit,
    toggleSignType,
    texts: textsForSign,
    resetForm,
  };
};
