import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import type { LoginFormValues } from '../schemas/login.schema';

import { handleApiError } from '../../../shared/api/error-handler';
import { useLogin } from '../hooks/useLogin';

import '../auth.css';

function LoginPage() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  function submitLogin(values: LoginFormValues) {
    loginMutation.reset();

    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate('/', { replace: true });
      },
    });
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
              ? handleApiError(loginMutation.error)
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
