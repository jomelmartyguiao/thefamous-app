import Modal from 'modules/common/components/Modal';
import Img from 'modules/common/components/Img';
import { ReactNode, useState } from 'react';

interface Props {
  buttonClassName?: string;
  children: ReactNode | JSX.Element | string;
  onCloseCallback?: () => void;
  imgSrc: string;
  imgDefaultSrc?: string;
  imgAlt?: string;
  imgClassName?: string;
}

const dSrc: string =
  'https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=6&m=1131164548&s=612x612&w=0&h=3-7WOnmaUlfAmYIkDVHxcOZhgfl0AeMPOgbd3xgi48c=';

const ModalImage = ({
  buttonClassName,
  onCloseCallback = () => {},
  imgSrc,
  imgDefaultSrc = dSrc,
  imgAlt = 'modal-image',
  imgClassName = '',
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    onCloseCallback();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={buttonClassName}>
        {children}
      </button>
      <Modal
        hideHeader
        closeOnClickOutSide
        transparent
        onClose={onClose}
        isOpen={isOpen}
      >
        <Img
          alt={imgAlt}
          className={imgClassName}
          defaultSrc={imgDefaultSrc}
          src={imgSrc}
        />
      </Modal>
    </>
  );
};

export default ModalImage;
