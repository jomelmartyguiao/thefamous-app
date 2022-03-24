import { SyntheticEvent, useEffect, useState } from 'react';
import _ from 'lodash';

import ModalWrapper from './ModalWrapper';
import UploadCanvas from 'modules/common/components/UploadCanvas';
import { getInputClass } from './manage-signature';
import useAppSelector from 'helpers/useAppSelector';
import type { ProfileProps } from 'modules/common/types';
import { FileInfo } from '@uploadcare/react-widget';
 import { IconText } from 'modules/common/components/Icons';

interface InputSignProps {
  onUpload: (url: string) => void;
}

const InputSignature = ({ onUpload }: InputSignProps) => {
  const [text, setText] = useState('');
  const [fontIndex, setFontIndex] = useState<1 | 2 | 3 | 4>(1);

  const profile: ProfileProps = useAppSelector('common.profile');

  useEffect(() => {
    if (!_.isEmpty(profile)) {
      // setText(`${profile.first_name || ''} ${profile.last_name}`);
      setText(profile?.username)
    }
  }, [profile]);

  const onChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setText(value);
  };

  const onChangeFont = () => {
    const num =
      fontIndex === 4 ? 1 : ((fontIndex + 1) as 1 | 2 | 3 | 4);
    setFontIndex(num);
  };

  const onSave = (fileInfo: FileInfo) => {
    onUpload(fileInfo.cdnUrl || '');
  };

  return (
    <>
      <div className="mb-4 flex">
        <input
          autoComplete="off"
          id="type-signature"
          maxLength={12}
          value={text}
          onChange={onChange}
          className={getInputClass(fontIndex)}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onChangeFont}
          className="rounded-md flex-1 py-2 px-2 bg-blue-900 text-center text-white text-sm disabled:bg-gray-400"
        >
          Change Font
        </button>
        <UploadCanvas
          onSuccess={onSave}
          className="rounded-md flex-1 py-2 px-2 bg-green-400 text-center text-white text-sm"
        >
          Save
        </UploadCanvas>
      </div>
    </>
  );
};

interface SignatureProps {
  handleType: any;
  setIsType: any;
}

const Signature = ({ handleType, setIsType }: SignatureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onUpload = (url: string) => {
    handleType(url);
    setIsOpen(false)
  };

  return (
    <>
      <span 
        onMouseEnter={() => setIsType(true)}
        onMouseLeave={() => setIsType(false)}
        className="absolute p-1 right-6 cursor-pointer" 
        onClick={() => setIsOpen(true)}>
          <IconText className="hover:text-blue-500" />
      </span>
      <ModalWrapper
        title="Type Signature"
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}>
          <InputSignature onUpload={onUpload} />
      </ModalWrapper>
    </>
  );
};

export default Signature;
