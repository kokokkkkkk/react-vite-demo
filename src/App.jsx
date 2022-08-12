import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

import Permission from './Permission';
function App() {
  return (
    <BrowserRouter>
      <Permission></Permission>
    </BrowserRouter>
  );
}

export default App;
