import { CompareHash, Hasher } from '@/data/protocols/crypto';
import bcrypt from 'bcryptjs';

export class BcryptAdapter implements Hasher, CompareHash {
  constructor() {}

  compare(decryptedText: string, encryptedText: string) {
    return bcrypt.compare(decryptedText, encryptedText);
  }

  hash(text: string) {
    return bcrypt.hash(text, 12);
  }
}
