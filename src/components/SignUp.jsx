import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router';
import * as yup from 'yup';
import useSignup from '../hooks/mutations/useSignup';

const signUpSchema = yup.object({
  firstName: yup.string().min(3).max(20).required(),
  lastName: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    resetField,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const {mutate: signup, isPending} = useSignup();

  /**
   * @type {import('react-hook-form').SubmitHandler<
   *    Record<'firstName' | 'lastName' | 'email' | 'password', string>
   * >}
   */
  const onSubmit = data => {
    return signup(data, {onError: () => resetField('password')});
  };

  return (
    <div className="mt-40 w-1/4 h-1/3 card bg-base-200 mx-auto shadow-lg">
      <h1 className="text-lg mx-auto mt-6 font-bold">
        Please create an account
      </h1>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <>
          <fieldset className="fieldset">
            <input
              type="text"
              {...register('firstName', {required: true})}
              className={`input w-full border-none ${errors.firstName ? 'input-error' : ''}`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <input
              type="text"
              {...register('lastName', {required: true})}
              className={`input w-full border-none ${errors.lastName ? 'input-error' : ''}`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </fieldset>
        </>
        <fieldset className="fieldset">
          <input
            type="email"
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
              'Sign Up'
            )}
          </button>
        </div>
        <button
          className="btn btn-link"
          type="button"
          onClick={() => {
            navigate('/login');
          }}
        >
          Already have an account ?
        </button>
      </form>
    </div>
  );
};

export default SignUp;
