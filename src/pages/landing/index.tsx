import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Wrapper>
        <Text type={TYPE.SB_24}>Admin</Text>
        <ButtonWrapper>
          <Button onClick={() => navigate('/pay')}>결제 요청</Button>
          <Button onClick={() => navigate('/mint')}>NFT 민팅</Button>
          <Button onClick={() => navigate('/ticket')}>티켓 인증</Button>
        </ButtonWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = tw.div`
  w-360 px-16 pt-60
  flex flex-col gap-40
`;
const ButtonWrapper = tw.div`
  flex flex-col gap-16
`;
const Button = tw.button`
  w-full h-120 flex-center
  font-sb-16 clickable rounded-8
  bg-gray1
`;

export default Landing;
