import spinnerGif from 'images/thefamous-loader.gif';

interface Props {
  height?: string | number;
}

const Spinner = ({ height = '100vh' }: Props) => (
  <div style={{ height }} className="w-full flex items-center justify-center">
    <img src={spinnerGif} alt="spinner" width="80px" />
  </div>
);

export default Spinner;
