import Login from './components/Login';
import Header from './components/Header';
import { Row, Col } from 'antd';
import { useProps } from './hooks';
import List from './components/List';

function App() {
  const { Auth } = useProps(state => state)
  return (
    <>
      <Row justify='center'>
        <Col span={20} >
          <Header />
        </Col>
      </Row>
      <Row>
        <Col span={6} />
        <Col span={12}>
          {
            Auth.token ?
              <List />
              :
              <Login />
          }
        </Col>
        <Col span={6} />
      </Row>
    </>
  );
}

export default App;
