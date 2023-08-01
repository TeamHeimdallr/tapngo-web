import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import getAddress from '~/aa/getAddress';
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
  const [isLogin, setIsLogin] = useState(false);
  const [address, setAddress] = useState('0x');

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
      ndef.addEventListener('reading', async (event: any) => {
        const { _, serialNumber } = event;
        // console.log(`> Serial Number: ${serialNumber}`);
        // console.log(`> Records: (${message.records.length})`);

        // TODO: AA and ZK
        const pkey = sha256Hash(serialNumber);
        if (pkey) {
          const address = await getAddress(`0x${pkey}`);
          const auth = { account: address };
          setAddress(address.slice(0, 5) + '...' + address.slice(-4));
          localStorage.setItem('card', JSON.stringify(auth));

          setIsLogin(true);
        }
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
            {isLogin ? (
              <>
                <IconChecked width={80} height={80} />
                <Divider bottom={24} />
                <Text type={TYPE.SB_16}>카드 등록이 완료되었습니다.</Text>
                <Divider bottom={40} />
                <CardInfoContainer>
                  <Text type={TYPE.R_12}>지갑 주소</Text>
                  <Text type={TYPE.SB_16}>{address}</Text>
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
            onClick={() => navigate('/')}
            isLoading={!isLogin}
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
  w-360 h-full px-16
  overflow-x-hidden
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-full
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
