import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import AddDish from '../components/AddDish';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFuncValue } from '../store/FuncReducer';
import AddType from '../components/AddType';
import EditDish from '../components/EditDish';
import EditType from '../components/EditType';
import DeleteDish from '../components/DeleteDish';
import DeleteType from '../components/DeleteType';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Добавить', 'add', <PlusOutlined />, [
    getItem('Блюдо', '1'),
    getItem('Раздел', '2'),
  ]),
  getItem('Изменить', 'edit', <EditOutlined />, [
    getItem('Блюдо', '3'),
    getItem('Раздел', '4'),
  ]),
  getItem('Удалить', 'del', <DeleteOutlined />, [
    getItem('Блюдо', '5'),
    getItem('Раздел', '6'),
  ]),
];



const Admin = () => {
    const funcState = useSelector((state: RootState) => state.func.funcValue)
    const dispatch = useDispatch()

    const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(<AddDish />);
    const onClick: MenuProps['onClick'] = (e) => {
        dispatch(setFuncValue(e.key))
      };
      useEffect(() => {
        switch (funcState) {
          case '1':
            setCurrentComponent(<AddDish />);
            break;
          case '2':
            setCurrentComponent(<AddType />);
            break;
          case '3':
            setCurrentComponent(<EditDish />);
            break;
          case '4':
            setCurrentComponent(<EditType />);
            break;
          case '5':
            setCurrentComponent(<DeleteDish />);
            break;
          case '6':
            setCurrentComponent(<DeleteType />);
            break;
          default:
            setCurrentComponent(null);
        }
      }, [funcState]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} >
        
        <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           {currentComponent}
          </div>
        </Content>

      </Layout>
    </Layout>
  )
}

export default Admin
