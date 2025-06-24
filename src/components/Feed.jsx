import {useQueries} from '@tanstack/react-query';
import {useState} from 'react';
import environment from '../config/environment';
import useSendRequest from '../hooks/useSendRequest';
import useToaster from '../hooks/useToaster';
import {FEED_LIMIT} from '../utils/constants';
import GenericFallback from '../utils/loaders/generic.fallback';

const Feed = () => {
  const toaster = useToaster();
  const [selectedPage, setSelectedPage] = useState(1);

  const [
    {data: usersCount, isPending: isCountPending},
    {data: users, isPending: isUsersPending},
  ] = useQueries({
    queries: [
      {
        queryKey: ['feedCount'],
        queryFn: async () => {
          const response = await fetch(
            `${environment.baseApiUrl}/users/feed/count`,
            {credentials: 'include'},
          );
          return response.json();
        },
      },
      {
        queryKey: ['users', selectedPage],
        queryFn: () => fetchUsers(selectedPage),
      },
    ],
  });

  const sendRequestMutation = useSendRequest(selectedPage);
  const numberOfPages = Array(
    Math.ceil((usersCount?.count ?? 0) / FEED_LIMIT),
  ).fill(0);

  const user = users?.[0];
  if (isCountPending || isUsersPending) {
    return GenericFallback('Feed');
  }

  /** @param {number} page */
  async function fetchUsers(page) {
    const response = await fetch(
      `${environment.baseApiUrl}/users/feed?page=${page}&limit=${FEED_LIMIT}`,
      {credentials: 'include'},
    );
    if (!response.ok) {
      toaster('Failed to load feed', 'error');
      return null;
    }
    return response.json();
  }

  return usersCount?.count !== 0 && user ? (
    <>
      <div className="mx-auto card bg-base-200 w-96 shadow-md mt-40">
        <div className="card-body">
          <h2 className="card-title">
            {`${user.firstName} ${user.lastName}  `}
            {user?.gender !== undefined && user.gender === 0 ? '♂️' : '♀️'}
          </h2>
          <p>{user.about}</p>
        </div>
        <figure>
          <img
            src={user.profileImageUrl}
            className="h-80 w-full"
            alt="profile-pic"
          />
        </figure>
        <div className="flex justify-between items-center m-6">
          <button
            className="btn btn-secondary"
            onClick={() =>
              sendRequestMutation.mutate({userId: user._id, status: 0})
            }
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              sendRequestMutation.mutate({userId: user._id, status: 0})
            }
          >
            Interested
          </button>
        </div>
      </div>
      <div className="join flex justify-center mt-14">
        {numberOfPages.map((_, idx) => (
          <span
            key={idx}
            className={
              'join-item btn btn-md' +
              (idx === selectedPage - 1 && ' btn-active')
            }
            onClick={() => {
              setSelectedPage(idx + 1);
            }}
          >
            {idx + 1}
          </span>
        ))}
      </div>
    </>
  ) : (
    <div className="flex justify-center mt-40">
      <span className="mx-auto text-xl font-black">No recommendation</span>
    </div>
  );
};

export default Feed;
