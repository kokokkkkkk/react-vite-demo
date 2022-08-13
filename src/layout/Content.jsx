import { Outlet } from 'react-router-dom';
const Content = () => {
  return (
    <div className="content" style={{ padding: '24px', backgroundColor: '#fff' }}>
      <Outlet></Outlet>
    </div>
  );
};
export default Content;
