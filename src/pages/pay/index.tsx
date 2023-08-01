import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import { TYPE } from '~/assets/fonts';
import { ButtonFilled } from '~/components/buttons';
import { Gnb } from '~/components/gnb';
import { Input } from '~/components/input';
import { Layout } from '~/components/layout';
import { Text } from '~/components/text';
import { useDebounce } from '~/hooks/data/use-debounce';
import { parseNumberWithComma } from '~/utils/number';

const PayPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500, setStatus);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().replace(/,/g, '');
    const regex = /^\d+$/;
    if (value !== '' && !regex.test(value)) {
      setStatus('error');
      return;
    } else if (value === '') setStatus('normal');
    if (value !== '') setValue(parseNumberWithComma(+value));
    else if (value === '') setValue(value);
  };

  const handleClick = () => {
    navigate(`/pay/${value.replace(/,/g, '')}`);
  };

  useEffect(() => {
    if (debouncedValue && status !== 'error') setStatus('done');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
            disabled={status !== 'done' || value === '0'}
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
  w-360 h-screen px-16 
`;
const Body = tw.div`
  pt-54 pb-16 flex flex-col h-screen
  justify-between
`;
const TextWrapper = tw.div`
  flex flex-col gap-48 pt-24
`;
