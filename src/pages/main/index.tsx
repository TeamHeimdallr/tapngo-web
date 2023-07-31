import { ConnectKitButton } from 'connectkit';
import tw from 'twin.macro';

import { useGetUsersQuery } from '~/api/api-server/users/users-get';
import { ButtonSmall } from '~/components/buttons/small';
import { useConnectWallet } from '~/hooks/data/use-connect-wallet';

const MainPage = () => {
  const { isConnected, truncatedAddress, disconnect } = useConnectWallet();
  const { data } = useGetUsersQuery();

  return (
    <Wrapper>
      <Text>{isConnected ? truncatedAddress : 'not connected'}</Text>
      <Text>{data?.data.numUsers}</Text>
      <ConnectKitButton.Custom>
        {({ isConnecting, isConnected, show }) => (
          <ButtonSmall
            text={isConnected ? 'disconnect' : 'connect'}
            isLoading={isConnecting}
            onClick={isConnected ? () => disconnect() : () => show?.()}
          />
        )}
      </ConnectKitButton.Custom>
    </Wrapper>
  );
};

const Wrapper = tw.div``;
const Text = tw.div`
  font-r-14
`;

export default MainPage;
