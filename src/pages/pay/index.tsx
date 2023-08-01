import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Gnb } from '~/components/gnb';
import { Input } from '~/components/input';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';

const PayPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    if (value !== '') {
      setValue(value);
      setStatus('type');
    } else if (value === '') {
      setStatus('normal');
      setValue(value);
    }
  };

  useEffect(() => {
    if (value === '') setStatus('normal');
  }, [value]);

  const handleClick = () => {
    navigate(`/admin/pay/${value.replace(/,/g, '')}`);
  };

  return (
    <Layout>
      <Wrapper>
        <Gnb />
        <Body>
          <TextWrapper>
            <Text type={TYPE.SB_24}>결제 요청</Text>
            <Input status={status} value={value} handleChange={handleChange} />
          </TextWrapper>
          <ButtonFilled
            disabled={value === ''}
            onClick={handleClick}
            width={328}
            text="요청하기"
            primary={'large'}
          />
        </Body>
      </Wrapper>
    </Layout>
  );
};

export default PayPage;

const Wrapper = tw.div`
  relative 
  w-360 h-full px-16 
  overflow-x-hidden
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-full
  justify-between 
`;
const TextWrapper = tw.div`
  flex flex-col gap-48 pt-24
`;
