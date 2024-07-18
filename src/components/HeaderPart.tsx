import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout'
import { Button, Menu, MenuProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTypeValue } from '../store/TypeReducer';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface DishType {
    id: string,
    name: string
}


const HeaderPart = () => {
    const typeState = useSelector((state: RootState) => state.type.typeValue)
    const dispatch = useDispatch()

    const onClick: MenuProps['onClick'] = (e) => {
        dispatch(setTypeValue(e.key))
      };
    
    const [dishTypes, setDishTypes] = useState<DishType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        fetch('http://87.251.83.39:5000/api/dishType')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setDishTypes(data.dishTypes);
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
    

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={
            dishTypes.map((type: DishType) => (
                {label: type.name, key: type.id}
                
            ))
          }
          onClick={onClick}
          style={{ flex: 1, minWidth: 0}}
        />
        <Button href='/basket' >
          <ShoppingCartOutlined style={{color: 'rgb(0,21,41)'}}/>
        </Button>
      </Header>
  )
}

export default HeaderPart
