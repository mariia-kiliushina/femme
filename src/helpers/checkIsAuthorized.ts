import {useGetUserQuery} from 'src/api/users';

export const checkIsAuthorized = ({
  authorizedUserResponse,
}: {
  authorizedUserResponse: ReturnType<typeof useGetUserQuery>;
}): boolean => {
  if (authorizedUserResponse.error === undefined) {
    return true;
  }
  return authorizedUserResponse.error.graphQLErrors.some((gqlError) => {
    const response = gqlError.extensions.response;
    if (typeof response !== 'object' || response === null) {
      return false;
    }
    if (!('statusCode' in response)) {
      return false;
    }
    return response.statusCode !== 401;
  });
};
