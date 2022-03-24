import loadingImg from 'images/thefamous-loader.gif';

const LoadingImg = () => (
  <div className='min-h-loader flex'>
    <img 
      src={loadingImg} 
      alt="Collection"
      loading='lazy' 
      className="bg-transparent h-auto w-1/3 m-auto border-gray-100"
    />
  </div>
)
export default LoadingImg