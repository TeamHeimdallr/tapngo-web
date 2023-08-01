import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { privateKeyToAccount } from 'viem/accounts';

import { NFT_ABI } from '~/abi/nft';
import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { publicClient, walletClient } from '~/configs/setup-contract';
import { sha256Hash } from '~/utils/string';

const MintingPage = () => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setLoading] = useState(false);

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
        setPrivateKey('0x' + pkey);
      });
    } catch (error) {
      console.error('Error while scanning NFC:', error);
    }
  };

  const mint = async () => {
    const account = privateKeyToAccount(privateKey as `0x${string}`);

    const { request } = await publicClient.simulateContract({
      account,
      address: '0x181a35eeb40ad002b8a331918e1d0efef569e8c8',
      abi: NFT_ABI,
      functionName: 'createToken',
    });

    const writeTx = await walletClient.writeContract(request);

    setLoading(true);
    await publicClient.waitForTransactionReceipt({
      hash: writeTx,
    });
    setLoading(false);
    setIsDone(true);
  };

  useEffect(() => {
    mint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privateKey]);

  useEffect(() => {
    handleNfcReading();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Gnb landing />
        <Body>
          <Container>
            {isDone ? <IconChecked width={80} height={80} /> : <IconPayed width={80} height={80} />}
            <Divider bottom={24} />
            {isDone ? (
              <Text type={TYPE.SB_16}>NFT 민팅이 완료되었습니다.</Text>
            ) : isLoading ? (
              <Text type={TYPE.SB_16}>결제가 진행중입니다.</Text>
            ) : (
              <Text type={TYPE.SB_16}>NFC 카드를 탭하여 민팅을 진행해주세요.</Text>
            )}
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
          </Container>
          <ButtonFilled
            isLoading={!isDone}
            width={328}
            text="확인"
            primary={'large'}
            onClick={() => navigate('/')}
          />
        </Body>
      </Wrapper>
    </Layout>
  );
};

export default MintingPage;

const Wrapper = tw.div`
  relative
  w-360 h-full px-16
  overflow-hidden
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-full
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
