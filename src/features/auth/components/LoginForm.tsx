import { useEffect } from 'react';
import {
  useForm,
  type Resolver,
} from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  isSubmitting: boolean;
  backendErrors: string[];
  onSubmit: (values: LoginFormValues) => void;
};

const loginResolver: Resolver<LoginFormValues> = async (values) => {
  const result = loginSchema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const fieldErrors = result.error.flatten().fieldErrors;

  return {
    values: {},
    errors: {
      ...(fieldErrors.email?.[0]
        ? {
            email: {
              type: 'validation',
              message: fieldErrors.email[0],
            },
          }
        : {}),
      ...(fieldErrors.password?.[0]
        ? {
            password: {
              type: 'validation',
              message: fieldErrors.password[0],
            },
          }
        : {}),
    },
  };
};

function LoginForm({
  isSubmitting,
  backendErrors,
  onSubmit,
}: LoginFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setFocus,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: loginResolver,
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
          className="auth-form-label"
          htmlFor="email"
        >
          Email
        </label>
        <FormInput
          id="email"
          autoComplete="email"
          disabled={isSubmitting}
          inputMode="email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? 'email-error' : undefined
          }
          {...register('email')}
        />
        {errors.email?.message && (
          <p
            className="auth-form-error"
            id="email-error"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="auth-form-field">
        <label
          className="auth-form-label"
          htmlFor="password"
        >
          Password
        </label>
        <FormInput
          id="password"
          autoComplete="current-password"
          disabled={isSubmitting}
          type="password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? 'password-error' : undefined
          }
          {...register('password')}
        />
        {errors.password?.message && (
          <p
            className="auth-form-error"
            id="password-error"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        className="auth-form-submit"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}

export default LoginForm;
