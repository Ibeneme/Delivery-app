
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../../../Redux/Users/Users';

export const useUserProfile = () => {
  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  const userr = useSelector((state) => state?.profile?.data?.data?.fullName);

  const ordinaryUserId = user?.ordinaryUserId;

  useEffect(() => {
    dispatch(fetchUser({ ordinaryUserId }))
      .then((response) => {})
      .catch((error) => {
      });
  }, [userr]);

  return {
    user,
    userr,
  };
};
