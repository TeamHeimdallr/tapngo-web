import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';

import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { IconChecked, IconPayed } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { parseNumberWithComma } from '~/utils/number';

export const Payment = () => {
  const navigate = useNavigate();
  const { price } = useParams();
  const [isDone, _] = useState<boolean>(false);

  useEffect(() => {
    // TODO : connect
    // setIsDone()
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
              <Text type={TYPE.SB_16}>결제가 완료되었습니다.</Text>
            ) : (
              <Text type={TYPE.SB_16}>NFC 카드를 탭하여 결제를 진행해주세요.</Text>
            )}
            <Divider bottom={24} />
            <div>
              <Text type={TYPE.SB_20} color={COLOR.GRAY6}>
                ₩
              </Text>
              <Text type={TYPE.SB_20}> {price && parseNumberWithComma(+price)}</Text>
            </div>
            <Divider bottom={4} />
            <Text type={TYPE.R_14} color={COLOR.GRAY6}>
              0.01 ETH
            </Text>
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

const Wrapper = tw.div`
  relative 
  w-360 h-screen px-16 
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-screen
  justify-between
`;
const Container = tw.div`
  flex flex-col pt-100
  items-center
`;
