import { exportCallDataGroth16 } from '../snarkjsZkproof';

export async function validateCalldata(serial: string, nonce: string) {
  const input = {
    serial: serial,
    nonce: nonce,
  };

  try {
    const dataResult: {
      a: string[];
      b: string[][];
      c: string[];
      Input: string[];
    } = await exportCallDataGroth16(
      input,
      '/zkproof/validate.wasm',
      '/zkproof/validate_final.zkey'
    );

    return dataResult;
  } catch (error) {
    console.log(error);
  }

  return null;
}
