export interface CompareHash {
  compare: (decryptedText: string, encryptedText: string) => Promise<boolean>;
}
