import { useContext, useEffect, useState } from 'react';

import { Layout, ConfigProvider } from 'antd';

import { IntlProvider } from 'react-intl';

import { localGet } from '@/utils';
import { RoutesContext } from '../utils/context';

import MyHeader from './Header';
import MyContent from './Content';
import MySider from './Sider';

// 组件库的中英文
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

// 自己编写的中英文
import zh from '@/locales/zh.js';
import en from '@/locales/en.js';
import './styles.less';

const { Header, Sider, Content } = Layout;

const lang = {
  zh: zhCN,
  en: enUS
};

//zh 中文文字
//en 英文文字
const intlLang = {
  zh,
  en
};

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { langCurrent } = useContext(RoutesContext);
  useEffect(() => {
    console.log(langCurrent, '---langCurrent');
  }, []);
  return (
    <ConfigProvider locale={lang[langCurrent]}>
      <IntlProvider locale={langCurrent} messages={intlLang[langCurrent]}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <MySider collapsed={collapsed} />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0
              }}>
              <MyHeader collapsed={collapsed} onCollapsed={() => setCollapsed(!collapsed)} />
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280
              }}>
              <MyContent />
            </Content>
          </Layout>
        </Layout>
      </IntlProvider>
    </ConfigProvider>
  );
};
export default MyLayout;
