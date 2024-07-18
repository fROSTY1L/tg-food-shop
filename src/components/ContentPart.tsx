import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';


interface Dish {
  id: number;
  name: string;
  price: number;
  img: string;
  createdAt: string;
  updatedAt: string;
  basketDishId: number | null;
  dishTypeId: number;
}


const ContentPart: React.FC = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

const typeIdState = useSelector((state: RootState) => state.type.typeValue)

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    fetch('http://87.251.83.39:5000/api/dish/?dishTypeId=' + typeIdState)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDishes(data.dishes);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [typeIdState]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Content style={{ padding: '0 2vw' }}>
    <div
      style={{
        background: colorBgContainer,
        minHeight: 280,
        padding: 24,
        borderRadius: borderRadiusLG,
      }}
    >
            {dishes.map(dish => (
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt={dish.name} src="" />}
        >
          {dish.name}
        </Card>
        ))}

    </div>
  </Content>
  );
};

export default ContentPart