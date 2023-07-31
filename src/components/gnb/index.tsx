import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { IconBack } from '../icons';

interface Props {
  landing?: boolean;
}

export const Gnb = ({ landing }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (landing) navigate('/');
    else navigate(-1);
  };
  return (
    <Wrapper>
      <IconWrapper>
        <IconBack onClick={handleClick} />
      </IconWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div(() => [
  tw`
    absolute top-0 left-0
    h-54 w-360 flex items-center py-15 px-16
    z-20
  `,
]);

const IconWrapper = styled.div(() => [tw`clickable`]);
