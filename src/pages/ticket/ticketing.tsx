import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { privateKeyToAccount } from 'viem/accounts';

import { useAlchemyGetOwnersForCollection } from '~/api/api-contract/alchemy/get-owners-for-collection';
import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconCancel, IconCheck, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { CONTRACT_ADDRESS } from '~/constants';
import { sha256Hash } from '~/utils/string';

const TicketingPage = () => {
  const navigate = useNavigate();
  const [isDone, setDone] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');

  const { data: nftOwner } = useAlchemyGetOwnersForCollection({
    contractAddress: CONTRACT_ADDRESS.POAP,
  });

  const isOwner = nftOwner?.owners
    ?.map(owner => owner.toLowerCase())
    ?.includes(address.toLowerCase() as `0x${string}`);

  const handleNfcReading = async () => {
    if (typeof NDEFReader === 'undefined') {
      console.log('NFC is not supported in this browser.');
      return;
    }

    try {
      console.log('NFC Reading Start');
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener('readingerror', () => {
        console.log('Argh! Cannot read data from the NFC tag. Try another one?');
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ndef.addEventListener('reading', (event: any) => {
        const { _, serialNumber } = event;
        // console.log(`> Serial Number: ${serialNumber}`);
        // console.log(`> Records: (${message.records.length})`);

        // TODO: AA and ZK
        const pkey = sha256Hash(serialNumber);
        const account = privateKeyToAccount(privateKey as `0x${string}`);

        setPrivateKey('0x' + pkey);
        setAddress(account.address);
      });
    } catch (error) {
      console.error('Error while scanning NFC:', error);
    }
  };

  useEffect(() => {
    // idle
    if (!address) return;

    // is owner - pass
    if (isOwner) {
      setError(false);
      setDone(true);
    }

    // is not owner - fail
    else {
      setError(true);
      setDone(true);
    }

    // rollback
    return () => {
      setError(false);
      setDone(false);
    };
  }, [address, isOwner]);

  useEffect(() => {
    handleNfcReading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Wrapper isDone={isDone} isError={isError}>
        <Gnb landing />
        <Body>
          <Container>
            {isDone ? (
              isError ? (
                <IconContainer>
                  <IconCancel width={40} height={40} />
                  <Text type={TYPE.SB_16}>티켓 인증이 불가능합니다.</Text>
                </IconContainer>
              ) : (
                <IconContainer>
                  <IconCheck width={40} height={40} />
                  <Text type={TYPE.SB_16}>티켓 인증이 완료되었습니다.</Text>
                </IconContainer>
              )
            ) : (
              <>
                <IconPayed width={80} height={80} />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>NFC 카드를 탭하여 인증을 진행해주세요.</Text>
                <Divider bottom={40} />
                <MintingWrapper>
                  <Image src="/poap.png" />
                  <TextContainer>
                    <Text type={TYPE.SB_16}>SWF 2023 해커톤 참가</Text>
                    <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                      2023년 7월 31일
                    </Text>
                  </TextContainer>
                </MintingWrapper>
              </>
            )}
          </Container>
          <ButtonFilled
            isLoading={!isDone}
            width={328}
            text="확인"
            primary={'large'}
            onClick={() => navigate('/')}
            bg={COLOR.WHITE}
          />
        </Body>
      </Wrapper>
    </Layout>
  );
};

export default TicketingPage;

interface Props {
  isDone?: boolean;
  isError?: boolean;
}

const Wrapper = styled.div<Props>(({ isDone, isError }) => [
  tw`relative h-screen px-16 w-360`,
  isDone && !isError && tw`bg-green`,
  isDone && isError && tw`bg-red`,
]);
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-screen
  justify-between
`;
const Container = tw.div`
  flex flex-col pt-100
  items-center
`;
const MintingWrapper = tw.div`
  p-8 w-full bg-gray1
  flex gap-16 rounded-8
`;
const TextContainer = tw.div`
  w-full h-full flex flex-col items-start justify-center
  gap-4
`;
const Image = tw.img`
  w-80 h-80
`;
const IconContainer = tw.div`
  h-128 flex flex-col gap-44 flex-center
`;
