import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import useUpdateProfile from '../hooks/mutations/useUpdateProfile';
import useLoggedInUser from '../hooks/queries/useLoggedInUser';
import {isNullOrUndefined} from '../utils/constants';
import GenericFallback from '../utils/loaders/generic.fallback';
import Gender from './ui/Gender';

const updateProfileSchema = yup
  .object({
    gender: yup.number().oneOf([0, 1, 2]).required(),
    age: yup.number().min(18, 'You must be at least 18 years old').required(),
    profileImageUrl: yup.string().url('Invalid URL'),
    skills: yup
      .string()
      .test('is-comma-separated', 'Skills must be comma-separated', value => {
        return value
          .split(',')
          .map(s => s.trim())
          .every(s => s.length >= 0);
      }),
    about: yup.string().max(250),
  })
  .required();

const Profile = () => {
  const user = useLoggedInUser();
  const {mutate: updateProfile, isPending} = useUpdateProfile();
  const {
    register,
    watch,
    reset,
    resetField,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  useEffect(() => {
    reset({
      age: user?.age ?? 18,
      gender: user?.gender ?? 0,
      profileImageUrl: user?.profileImageUrl ?? '',
      about: user?.about ?? '',
      skills: user?.skills.join(','),
    });
  }, [user, reset]);

  if (isNullOrUndefined(user)) {
    return GenericFallback('Profile');
  }

  /** @type {import('react-hook-form').SubmitHandler<{
   *      age: number,
   *      gender: 0 | 1 | 2,
   *      profileImageUrl: string,
   *      about: string,
   *      skills: string,
   * }>}
   */
  const onSubmit = ({skills, ...data}) => {
    return updateProfile({
      ...data,
      skills: skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0),
    });
  };

  return (
    <div className="flex gap-4 justify-center items-center">
      <form
        className="card p-8 h-1/2 gap-4 bg-base-200 w-96 shadow-md mt-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="fieldset">
          <input
            type="number"
            {...register('age', {required: true})}
            className={`input w-full border-none ${errors.age ? 'input-error' : ''}`}
            placeholder="Enter your age"
          />
          {errors.age && (
            <span className="text-red-500 text-xs">{errors.age.message}</span>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <div className="flex items-center gap-4">
            {['Male', 'Female', 'Others'].map((label, index) => (
              <div className="flex items-center gap-1.5" key={index}>
                <input
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary"
                  checked={index === watch('gender')}
                  value={index}
                  {...register('gender', {
                    onChange: evt => {
                      resetField('gender', {
                        defaultValue: Number(evt.target.value),
                      });
                    },
                  })}
                />
                {label}
              </div>
            ))}
          </div>
          {errors.gender && (
            <span className="text-red-500 text-xs">
              {errors.gender.message}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <input
            type="url"
            {...register('profileImageUrl')}
            className={`input w-full border-none ${errors.profileImageUrl ? 'input-error' : ''}`}
            placeholder="Enter your profile image URL"
          />
          {errors.profileImageUrl && (
            <span className="text-red-500 text-xs">
              {errors.profileImageUrl.message}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <textarea
            {...register('about')}
            className="textarea w-full"
            placeholder="Enter something about you"
          ></textarea>
          {errors.about && (
            <span className="text-red-500 text-xs">{errors.about.message}</span>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <textarea
            {...register('skills')}
            className="textarea w-full h-52"
            placeholder="Enter your skills (comma separated)"
          ></textarea>
          {errors.skills && (
            <span className="text-red-500 text-xs">
              {errors.skills.message}
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
              'Update'
            )}
          </button>
        </div>
      </form>
      <div className="card bg-base-200 w-96 shadow-md mt-40">
        <div className="card-body">
          <h2 className="card-title">
            {`${user.firstName} ${user.lastName}`}
            <Gender gender={user.gender} />
            {user.age && (
              <span className="text-sm">{`(${user.age} years old)`}</span>
            )}
          </h2>
          <p>{user.about}</p>
          <figure>
            <img
              src={user.profileImageUrl}
              className="h-80 w-full"
              alt="profile-pic"
            />
          </figure>
          {user.skills.length !== 0 && (
            <span className="mt-4">
              <strong>Skills:</strong> {user.skills.join(' || ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
