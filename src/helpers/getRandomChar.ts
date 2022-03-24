const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const getRandomChar = (length: number): string => {
  const finalCode = Array.from(
    { length },
    (_) => code[Math.floor(Math.random() * code.length)]
  ).join('');

  return finalCode;
};

export default getRandomChar;
