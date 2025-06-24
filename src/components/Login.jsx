import {useQueryClient} from '@tanstack/react-query';
import {useRef} from 'react';
import {useNavigate} from 'react-router';
import environment from '../config/environment.js';
import useToaster from '../hooks/useToaster.js';

const Login = () => {
  const navigate = useNavigate();
  const toaster = useToaster();
  /** @type {import("react").Ref<HTMLInputElement>} */
  const emailRef = useRef(null);
  /** @type {import("react").Ref<HTMLInputElement>} */
  const passwordRef = useRef(null);
  const queryClient = useQueryClient();

  const onLogin = async () => {
    try {
      const res = await fetch(`${environment.baseApiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json();
        toaster(err.message, 'error');
      } else {
        const data = await res.json();
        queryClient.removeQueries({queryKey: ['loggedInUser']});
        toaster(data.message, 'success');
        navigate('/');
      }
    } catch {
      toaster('Unexpected error occured', 'error');
    }
  };

  return (
    <div className="mt-40 w-1/4 h-1/3 card bg-base-200 mx-auto shadow-lg">
      <h1 className="text-lg mx-auto mt-6 font-bold">
        Please Login to continue
      </h1>
      <div className="card-body">
        <fieldset className="fieldset">
          <input
            type="text"
            ref={emailRef}
            className="input w-full border-none"
            placeholder="Enter your email address"
          />
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="password"
            ref={passwordRef}
            className="input w-full border-none"
            placeholder="Enter your password"
          />
        </fieldset>
        <div className="card-actions justify-end my-4">
          <button className="btn btn-soft btn-primary w-full" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
