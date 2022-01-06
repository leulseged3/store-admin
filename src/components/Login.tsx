import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { login } from '../api/login';
import { useActions, useProps } from '../hooks';

export default () => {
  const actions = useActions();
  const { Auth } = useProps(state => state);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { email: string, password: string }) => {
    setLoading(true)
    login(values.email, values.password)
      .then(res => actions.Auth.setAuth({ ...res, token: res.access_token }))
      .catch(() => setLoginError(true))
      .finally(() => setLoading(false))
  };
  console.log(Auth)
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        // // wrapperCol={{
        //   span: 16,
        // }}
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          // label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder='Enter Email Address' />
        </Form.Item>

        <Form.Item
          // label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder='********' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            // offset: 4,
            // span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {
        loginError &&
        <h3 style={{ color: 'red' }}>Something went wrong.please try again</h3>
      }
    </>
  );
};