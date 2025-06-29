import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router';
import * as yup from 'yup';
import useLogin from '../hooks/mutations/useLogin.js';

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    resetField,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {mutate: login, isPending} = useLogin();

  /**
   * @type {import('react-hook-form').SubmitHandler<
   *  {
   *    email: string,
   *    password: string,
   *  }
   * >}
   */
  const onSubmit = data => {
    return login(data, {onError: () => resetField('password')});
  };

  return (
    <div className="mt-40 w-1/4 h-1/3 card bg-base-200 mx-auto shadow-lg">
      <h1 className="text-lg mx-auto mt-6 font-bold">
        Please login to continue
      </h1>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <input
            type="text"
            {...register('email', {required: true})}
            className={`input w-full border-none ${errors.email ? 'input-error' : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="password"
            {...register('password', {required: true})}
            className={`input w-full border-none ${errors.password ? 'input-error' : ''}`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </fieldset>
        <div className="card-actions justify-end my-4">
          <button
            className={`btn btn-secondary w-full ${isPending ? 'btn-disabled' : ''}`}
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </div>
        <button
          className="btn btn-link"
          type="button"
          onClick={() => {
            navigate('/signup');
          }}
        >
          Create a new account
        </button>
      </form>
    </div>
  );
};

export default Login;
