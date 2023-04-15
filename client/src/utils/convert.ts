export const createEncryptedJson = (str1: string, str2: string) => {
  return {
    encryptedKey: str1,
    encryptedText: str2,
  };
};
