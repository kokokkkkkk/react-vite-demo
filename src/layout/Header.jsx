import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Dropdown, Menu, Breadcrumb } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '@/hooks';

const Header = (props) => {
  const { collapsed, onCollapsed } = props;
  console.log(collapsed, 'collapsed');
  console.log(onCollapsed, 'onCollapsed');
  const breads = useBreadcrumb();
  console.log('header', breads);
  const navigate = useNavigate();
  const skipBreak = (ele) => {
    if (ele.path) {
      navigate(ele.path, { replace: true });
    }
  };
  return (
    <div className="header">
      <Row className="headerRow">
        <Col span={16}>
          {/* 菜单收缩与展开 */}
          <div className="toggle" onClick={onCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Breadcrumb style={{ display: 'inline-block', marginLeft: '30px' }} separator="/">
            {breads.map((ele) => (
              <Breadcrumb.Item key={ele.key} onClick={() => skipBreak(ele)}>
                {ele.label}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <div className="icons">
            <FullscreenOutlined />
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      key: 'avatar',
                      label: <div>退出登录</div>
                    }
                  ]}
                />
              }
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}>
              <div style={{ display: 'inline-block', cursor: 'pointer', paddingRight: '20px' }}></div>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Header.propTypes = {
  onCollapsed: PropTypes.func,
  collapsed: PropTypes.bool
};

Header.defaultProps = {
  onCollapsed: () => {},
  collapsed: false
};

export default Header;
