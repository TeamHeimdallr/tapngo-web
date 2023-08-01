import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { privateKeyToAccount } from 'viem/accounts';

import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { sha256Hash } from '~/utils/string';

const CardPage = () => {
  const navigate = useNavigate();
  const [txhash, _] = useState('');
  const [__, setPrivateKey] = useState('');

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
        const { address } = privateKeyToAccount(`0x${pkey}`);
        const auth = { account: address };
        localStorage.setItem('card', JSON.stringify(auth));
      });
    } catch (error) {
      console.error('Error while scanning NFC:', error);
    }
  };

  useEffect(() => {
    handleNfcReading();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Gnb />
        <Body>
          <Container>
            {txhash ? (
              <>
                <IconChecked width={80} height={80} />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>카드 등록이 완료되었습니다.</Text>
                <Divider bottom={40} />
                <CardInfoContainer>
                  <Text type={TYPE.R_12}>카드 시리얼</Text>
                  <Text type={TYPE.SB_16}>00-00-00-00</Text>
                </CardInfoContainer>
              </>
            ) : (
              <>
                <IconPayed />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>NFC 카드를 탭하여 카드를 등록해주세요.</Text>
              </>
            )}
          </Container>
          <ButtonFilled
            onClick={() => navigate('/my')}
            isLoading={!txhash}
            width={328}
            text="확인"
            primary={'large'}
          />
        </Body>
      </Wrapper>
    </Layout>
  );
};

export default CardPage;

const Wrapper = tw.div`
  relative 
  w-360 h-screen px-16 
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-screen
  justify-between
`;
const Container = tw.div`
  flex flex-col flex-center  pt-100
`;
const CardInfoContainer = tw.div`
  w-full h-96 py-24 px-8 bg-gray1
  rounded-8 flex flex-col flex-center
  gap-4
`;
