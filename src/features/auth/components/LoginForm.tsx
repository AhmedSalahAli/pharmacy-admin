import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';

import {
  loginSchema,
  type LoginFormValues,
} from '../schemas/login.schema';

type LoginFormProps = {
  isSubmitting: boolean;
  backendErrors: string[];
  onSubmit: (values: LoginFormValues) => void;
};

function LoginForm({
  isSubmitting,
  backendErrors,
  onSubmit,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form
      className="auth-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {backendErrors.length > 0 && (
        <div
          className="auth-form-alert"
          role="alert"
        >
          {backendErrors.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}

      <div className="auth-form-field">
        <label
          htmlFor="email"
          className="auth-form-label"
        >
          Email
        </label>

        <FormInput
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? 'email-error' : undefined
          }
          {...register('email')}
        />

        {errors.email && (
          <p
            id="email-error"
            className="auth-form-error"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="auth-form-field">
        <label
          htmlFor="password"
          className="auth-form-label"
        >
          Password
        </label>

        <FormInput
          id="password"
          type="password"
          autoComplete="current-password"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? 'password-error' : undefined
          }
          {...register('password')}
        />

        {errors.password && (
          <p
            id="password-error"
            className="auth-form-error"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="auth-form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}

export default LoginForm;
