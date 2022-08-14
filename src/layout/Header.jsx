import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Dropdown, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TranslationOutlined,
  FullscreenOutlined,
  UserOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
import { useBreadcrumb } from '@/hooks';
import { RoutesContext } from '../utils/context';
import { locaRemove, localGet, localSet } from '@/utils';
import screenfull from 'screenfull';

const langs = [
  {
    key: 'zh',
    label: '中文'
  },
  {
    key: 'en',
    label: 'English'
  }
];
// onSetLange langCurrent
const Header = (props) => {
  const { collapsed, onCollapsed } = props;
  const [isScreenfull, setScreenfull] = useState(screenfull.isFullscreen);
  const { langCurrent, onSetLange } = useContext(RoutesContext);
  const breads = useBreadcrumb();
  const navigate = useNavigate();

  const skipBreak = (ele) => {
    if (ele.path) {
      navigate(ele.path, { replace: true });
    }
  };

  const onScreenfull = (ele) => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setScreenfull((state) => !state);
    }
  };

  const onLang = (value) => {
    onSetLange(value);
    localSet('lang', value);
  };

  const userOut = () => {
    locaRemove('token');
    navigate('/login', { replace: true });
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
            <span onClick={() => onScreenfull()}>
              {!isScreenfull ? (
                <FullscreenOutlined className="headerIcon" />
              ) : (
                <FullscreenExitOutlined className="headerIcon" />
              )}
            </span>
            {/* style={ item.key===langCurrent?{backgroundColor:'var(--ant-primary-color)'}:{} }  */}
            <Dropdown
              overlay={
                <Menu
                  items={langs.map((item) => {
                    return {
                      key: item.key,
                      label: (
                        <div
                          onClick={() => onLang(item.key)}
                          key={item.key}
                          style={item.key === langCurrent ? { backgroundColor: 'var(--ant-primary-color)' } : {}}>
                          {item.label}
                        </div>
                      )
                    };
                  })}
                />
              }
              placement="bottomRight"
              arrow={{
                pointAtCenter: true
              }}>
              <TranslationOutlined className="headerIcon" />
            </Dropdown>
            <Dropdown
              overlay={
                <Menu
                  items={['退出'].map((item, index) => {
                    return {
                      key: index,
                      label: <div onClick={userOut}>{item}</div>
                    };
                  })}
                />
              }
              placement="bottomRight"
              arrow={{
                pointAtCenter: true
              }}>
              <UserOutlined className="headerIcon" />
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
