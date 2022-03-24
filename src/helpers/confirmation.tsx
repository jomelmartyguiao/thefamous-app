import { ReactNode, useEffect, useState } from 'react';
import { render } from 'react-dom';
import Modal from 'modules/common/components/Modal';

const addElement = () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'confirmation-dialog');
  document.body.appendChild(div);
};

const removeElement = () => {
  try {
    const element = document.getElementById('confirmation-dialog');
    element?.parentNode?.removeChild(element);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

interface Props {
  label: string;
  onConfirm: () => void;
  confirmLabel?: string | ReactNode | JSX.Element;
  cancelLabel?: string | ReactNode | JSX.Element;
  title?: string | ReactNode;
}

const Component = ({
  label,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  title = 'Confirmation!',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const onClose = () => {
    setIsOpen(false);
    removeElement();
  };

  const handleCofirm = () => {
    onConfirm();
    setIsOpen(false);
    removeElement();
  };

  const footer = (
    <>
      <button
        className="text-red-300 background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none hover:text-red-500 hover:bg-red-200 rounded-md mr-1"
        type="button"
        style={{ transition: 'all .15s ease' }}
        onClick={onClose}
      >
        {cancelLabel}
      </button>
      <button
        className="bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-1 rounded-md shadow hover:shadow-lg outline-none focus:outline-none ml-1"
        type="button"
        style={{ transition: 'all .15s ease' }}
        onClick={handleCofirm}
      >
        {confirmLabel}
      </button>
    </>
  );

  return (
    <Modal onClose={onClose} title={title} isOpen={isOpen} footer={footer}>
      {/* eslint-disable-next-line react/no-danger */}
      <h4
        dangerouslySetInnerHTML={{ __html: label || '' }}
        className="leading-6"
      />
    </Modal>
  );
};

type OptionProps = {
  confirmLabel?: string | ReactNode | JSX.Element;
  cancelLabel?: string | ReactNode | JSX.Element;
  headerLabel?: string | ReactNode | JSX.Element;
};

const createElement = (
  label: string,
  onConfirm: () => void,
  options: OptionProps = {}
) => {
  const div = document.getElementById('confirmation-dialog');
  render(<Component label={label} onConfirm={onConfirm} {...options} />, div);
};

const confirmation = (
  label: string,
  onConfirm: () => void,
  options: OptionProps = {}
) => {
  addElement();
  createElement(label, onConfirm, options);
};

export default confirmation;
