import axios from 'axios';

import LoginForm, {
  type LoginFormValues,
} from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';

import '../auth.css';

function getBackendErrorMessages(error: unknown): string[] {
  if (!axios.isAxiosError(error)) {
    return ['Unable to sign in. Please try again.'];
  }

  const data = error.response?.data;

  if (!data) {
    return ['Unable to reach the server. Please try again.'];
  }

  if (typeof data === 'string') {
    return [data];
  }

  if (Array.isArray(data.message)) {
    return data.message;
  }

  if (typeof data.message === 'string') {
    return [data.message];
  }

  if (typeof data.error === 'string') {
    return [data.error];
  }

  if (data.errors && typeof data.errors === 'object') {
    return Object.values(data.errors)
      .flatMap((value) => {
        if (Array.isArray(value)) {
          return value;
        }

        if (typeof value === 'string') {
          return value;
        }

        return [];
      })
      .filter((value): value is string => value.length > 0);
  }

  return ['Unable to sign in. Please check your credentials.'];
}

function LoginPage() {
  const loginMutation = useLogin();

  function submitLogin(values: LoginFormValues) {
    loginMutation.reset();
    loginMutation.mutate(values);
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-page-header">
          <p className="auth-page-kicker">Pharmacy Admin</p>
          <h1 className="auth-page-title">Sign in</h1>
          <p className="auth-page-subtitle">
            Access your inventory, suppliers, and pharmacy operations.
          </p>
        </div>

        <LoginForm
          backendErrors={
            loginMutation.isError
              ? getBackendErrorMessages(loginMutation.error)
              : []
          }
          isSubmitting={loginMutation.isPending}
          onSubmit={submitLogin}
        />
      </section>
    </main>
  );
}

export default LoginPage;
