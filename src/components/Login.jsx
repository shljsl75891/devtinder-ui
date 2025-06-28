import {useRef} from 'react';
import useLogin from '../hooks/mutations/useLogin.js';

const Login = () => {
  /** @type {import("react").Ref<HTMLInputElement>} */
  const emailRef = useRef(null);
  /** @type {import("react").Ref<HTMLInputElement>} */
  const passwordRef = useRef(null);
  const {mutate: login, isPending} = useLogin();

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
          <button
            className={`btn btn-soft btn-primary w-full ${isPending ? 'btn-disabled' : ''}`}
            onClick={() => {
              login({
                email: emailRef.current.value,
                password: passwordRef.current.value,
              });
            }}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
