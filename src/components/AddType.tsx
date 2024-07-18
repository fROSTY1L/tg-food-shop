import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const AddType: React.FC = () => {
  const [typeName, setTypeName] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://87.251.83.39:5000/api/dishType/create', {
        name: typeName,
      });
      console.log('Тип блюда создан:', response.data);
      setTypeName('');
    } catch (error) {
      console.error('Ошибка при создании типа блюда:', error);
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Название">
          <Input
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            required
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddType;
