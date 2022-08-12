import { Button, Checkbox, Form, Input } from 'antd';
import md5 from 'js-md5';
import axios from '@/utils/axios';
import { localSet } from '@/utils';
import './index.less';
const Login = () => {
  const onFinish = (values) => {
    const { password, username } = values;
    axios
      .post('/adminUser/login', {
        userName: username,
        passwordMd5: md5(password)
      })
      .then((res) => {
        localSet('token', res);
        window.location.href = '/';
      });
  };

  return (
    <div className="login">
      <div className="wrap">
        <Form
          name="login"
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 20
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { pattern: /[a-zA-Z]{4,12}/, message: '请输入4~12位由字母组成的用户名' }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item label="密 码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16
            }}>
            <Checkbox>记住用户名</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16
            }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
