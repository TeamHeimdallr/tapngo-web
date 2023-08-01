import { createHash } from 'crypto';

export const truncateAddress = (addr?: `0x${string}`, limit = 4) => {
  if (!addr) return '';

  const zerox = addr.slice(0, 2) == '0x' ? 2 : 0;
  return addr.slice(0, zerox + limit) + '...' + addr.slice(-limit, addr.length);
};

export const sha256Hash = (input: string) => {
  // Remove colons and make sure the input is a valid hex string
  const hexInput = input.replace(/:/g, '');
  if (!/^([0-9A-Fa-f]{2})*$/.test(hexInput)) {
    throw new Error('Invalid hex string');
  }

  // Create a hash object
  const hash = createHash('sha256');

  // Write the hex input to the hash object
  hash.update(Buffer.from(hexInput, 'hex'));

  // Compute the hash and return as a hex string
  return hash.digest('hex');
};
