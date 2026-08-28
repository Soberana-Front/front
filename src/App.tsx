import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;