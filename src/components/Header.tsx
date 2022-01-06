import { Avatar, Button, Dropdown, Menu, PageHeader } from 'antd';
import { useActions, useProps } from '../hooks';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

export default () => {
  const { Auth } = useProps(state => state);
  const actions = useActions()
  const onLogoutButtonClick = () => {
    actions.Auth.setAuth({
      email: '',
      firstName: '',
      lastName: '',
      token: ''
    })
  }
  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <Button
          type="text"
        >
          MY PROFILE
        </Button>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>
        <Button
          type="text"
        >
          SETTINGS
        </Button>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <Button
          type="text"
          onClick={onLogoutButtonClick}
        >
          LOGOUT
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    < div className="site-page-header-ghost-wrapper" >
      <PageHeader
        ghost={false}
        title="OUR STORE"
        subTitle="This is our store management system"
        extra={[
          Auth.token &&
          <Dropdown overlay={menu} placement="topLeft">
            <Avatar style={{ color: 'black' }}>
              {Auth.firstName[0].toUpperCase()}{Auth.lastName[0].toUpperCase()}
            </Avatar>
          </Dropdown>
        ]}
      />
    </div >
  )
}