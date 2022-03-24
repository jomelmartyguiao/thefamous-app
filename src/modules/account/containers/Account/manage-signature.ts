import html2canvas from 'html2canvas';
import dataURLtoFile from 'helpers/dataURLtoFile';
// import getRandomNumber from 'helpers/getRandomNumber';

const getFirstLetter = (str: string): string => {
  const firstLetter = str[0] || '';
  return firstLetter;
};

export const getInitials = (firstName: string, lastName: string): string => {
  const fi = getFirstLetter(firstName);
  const li = getFirstLetter(lastName);
  return `${fi}${li}`;
};

const fonts: Array<string> = [
  'fonts-amberlyn',
  'fonts-rationale',
  'fonts-angel-signature',
  'fonts-alleffra',
  'fonts-william',
  'fonts-brittany',
];

export const getNewFontFam = (currentFam: string): string => {
  const num = fonts.indexOf(currentFam);
  const newFont = fonts.length - 1 === num ? fonts[0] : fonts[num + 1];
  return newFont;
  // const filteredFonts = fonts.filter((item) => currentFam !== item);
  // const randomNum = getRandomNumber(filteredFonts.length);
  // return filteredFonts[randomNum];
};

type FontObj = {
  1: 'fonts-amberlyn';
  2: 'fonts-rationale';
  // 3: 'fonts-angel-signature';
  3: 'fonts-alleffra';
  // 5: 'fonts-william';
  4: 'fonts-brittany';
};

const fontObj: FontObj = {
  1: 'fonts-amberlyn',
  2: 'fonts-rationale',
  // 3: 'fonts-angel-signature',
  3: 'fonts-alleffra',
  // 5: 'fonts-william',
  4: 'fonts-brittany',
};

// 'Amberlyn', 'Rationale', 'AngelSignature', 'Alleffra', 'William', 'Brittany'

export const fontPayloads = {
  1: 'Amberlyn',
  2: 'Rationale',
  // 3: 'AngelSignature',
  3: 'Alleffra',
  // 5: 'William',
  4: 'Brittany',
};

export const getNewFont = (index: number): string => {
  const num = index === 6 ? 1 : ((index + 1) as 1 | 2 | 3 | 4);
  return fontObj[num];
};

export const getInputClass = (index: 1 | 2 | 3 | 4) => {
  const dClass =
    `font-semibold text-center w-5/12 mx-auto text-3xl h-20 focus:border-blue-400 transition duration-300 ease-in-out focus:outline-none`;
  return `${dClass} ${fontObj[index]}`;
};

export const getInputClassName = (fontClassName: string): string => {
  const dClass =
    'font-semibold text-center w-3/4 mx-auto text-3xl py-4 h-16 focus:border-blue-400 transition duration-300 ease-in-out focus:outline-none';
  return `${dClass} ${fontClassName}`;
};

export const uploadBlob = async () => {
  try {
    const root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', 'overflow-hidden');
    const el = document.getElementById('type-signature') as HTMLInputElement;
    const canvas = await html2canvas(el);
    const signatureBase64 = canvas.toDataURL('image/jpeg');
    const fileToUpload = dataURLtoFile(signatureBase64, 'image.jpeg');
    return fileToUpload;
  } catch (error) {
    console.log(error, 'uploadBlob');
  }
};
