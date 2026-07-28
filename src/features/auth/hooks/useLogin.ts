import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../../../store/useAuthStore';
import { login } from '../api/auth.api';

export function useLogin() {
  const loginStore = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: login,

    onSuccess(data) {
      loginStore(data.user, data.accessToken);
    },
  });
}
