import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { COLOR } from '~/assets/colors';
import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Divider } from '~/components/divider';
import { Gnb } from '~/components/gnb';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

const TicketPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/ticket/1`);
  };

  return (
    <Layout>
      <Wrapper>
        <Gnb />
        <Body>
          <Container>
            <Text type={TYPE.SB_24}>티켓 인증</Text>
            <MintingWrapper>
              <Image src="/poap.png" alt="" />
              <Divider bottom={16} />
              <Text type={TYPE.SB_16}>SWF 2023 해커톤 참가</Text>
              <Divider bottom={4} />
              <Text type={TYPE.R_12} color={COLOR.GRAY5}>
                2023년 7월 31일
              </Text>
            </MintingWrapper>
          </Container>
          <ButtonFilled onClick={handleClick} width={328} text="인증하기" primary={'large'} />
        </Body>
      </Wrapper>
    </Layout>
  );
};

export default TicketPage;

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
  flex flex-col gap-48 pt-24
`;
const MintingWrapper = tw.div`
  flex flex-col flex-center
`;
const Image = tw.img`
  w-180 h-180
`;
