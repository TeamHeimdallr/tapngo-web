import { ChangeEvent, useEffect, useState } from 'react';
import tw from 'twin.macro';

import { Input } from '~/components/input';
import { useDebounce } from '~/hooks/data/use-debounce';
import { parseNumberWithComma } from '~/utils/number';

export default {
  component: Input,
  title: 'Components/Input',
};

const Template = () => {
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500, setStatus);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().replace(/,/g, '');
    const regex = /^\d+$/;
    if (value !== '' && !regex.test(value)) {
      setStatus('error');
      setValue(value);
      return;
    } else if (value === '') setStatus('normal');
    setValue(parseNumberWithComma(+value));
  };
  useEffect(() => {
    if (debouncedValue && status !== 'error') setStatus('done');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Wrapper>
      <Input status={status} value={value} handleChange={handleChange} />
    </Wrapper>
  );
};
const Wrapper = tw.div`
  flex flex-col gap-30
  w-500
`;

export const Default = Template.bind({});
