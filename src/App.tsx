import { lazy, Suspense } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { useCheckIsLogin } from 'modules/common/hooks';
import Spinner from 'modules/common/components/Spinner';
import './App.css';


const Routes = lazy(() => import('Routes'));

function App() {
  useCheckIsLogin();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes />
      </Suspense>
      <ToastContainer position="top-center" transition={Slide} limit={2} />
    </>
  );
}

export default App;
