import PropTypes from 'prop-types';
import { SyntheticEvent } from 'react';

interface Props {
  src: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  width?: string;
  style?: object;
}

const Img = ({ src, defaultSrc, alt, className, width, ...rest }: Props) => {
  const onError = (e: SyntheticEvent) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== defaultSrc) {
      target.src = defaultSrc;
    }
  };

  return (
    <img
      src={src || defaultSrc}
      onError={onError}
      alt={alt}
      className={className}
      width={width}
      {...rest}
    />
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  defaultSrc: PropTypes.string.isRequired,
};

export default Img;
