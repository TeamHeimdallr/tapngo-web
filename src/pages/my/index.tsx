import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { IconPlus } from '~/components/icons';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

export const My = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/my/card');
  };
  return (
    <Layout>
      <Wrapper>
        <Text type={TYPE.SB_24}>내 지갑</Text>
        <AddCardContainer onClick={handleClick}>
          <IconPlus />
          <Text type={TYPE.R_14}> 카드 등록하기</Text>
        </AddCardContainer>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = tw.div`
  w-360 px-16 pt-60
  flex flex-col gap-40
`;

const AddCardContainer = tw.div`
  h-122 w-full bg-gray1 gap-8
  flex flex-col flex-center
  clickable rounded-8
`;
