import { useNavigate } from "react-router-dom";
import { Row, Col, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FontSizeOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import {useBreadcrumb} from '@/hooks'

const Header = (props) => {
  const { collapsed, onCollapsed } = props;
  const breads = useBreadcrumb()
  console.log("header", breads);
  const navigate = useNavigate()
  const skipBreak = ele => {
    if (ele.path) {
      navigate(ele.path, {replace: true})
    }
  }
  return (
    <div className="header">
      <div className="toogr">
        <Row>
          <Col span={16}>
            {/* 菜单收缩与展开 */}
            <div className="toggle" onClick={onCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <Breadcrumb style={{display:'inline-block', marginLeft:'30px'}} separator='/'>
          {
            breads.map(ele=>(
              <Breadcrumb.Item key={ele.key} onClick={()=>skipBreak(ele)}>
                { ele.label }
              </Breadcrumb.Item>
            ))
          }
          </Breadcrumb>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
