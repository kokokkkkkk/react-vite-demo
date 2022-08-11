import { Outlet } from 'react-router-dom'
const Content = () => {
  return (
    <div className="content">
      <Outlet></Outlet>
    </div>
  )
}

export default Content
