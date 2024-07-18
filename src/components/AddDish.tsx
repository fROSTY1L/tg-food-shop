import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

interface DishType {
  id: string,
  name: string
}


const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddDish: React.FC = () => {
  const [dishName, setDishName] = useState<string>('');
  const [dishPrice, setDishPrice] = useState<string>('');
  const [dishType, setDishType] = useState<string>('');
  const [dishTitle, setDishTitle] = useState<string>('');
  const [dishDescription, setDishDescription] = useState<string>('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [dishTypes, setDishTypes] = useState<DishType[]>([]);

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
      })
      .catch(error => {
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', dishName);
    formData.append('price', dishPrice);
    formData.append('dishTypeId', dishType);
    formData.append('title', dishTitle);
    formData.append('description', dishDescription);
    fileList.forEach((file) => {
      formData.append('img', file.originFileObj);
    });

    try {
      const response = await axios.post('http://87.251.83.39:5000/api/dish', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Блюдо создано:', response.data);
      setDishName('');
      setDishPrice('');
      setDishType('');
      setDishTitle('');
      setDishDescription('');
      setFileList([]);
    } catch (error) {
      console.error('Ошибка при создании блюда:', error);
    }
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);

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
          <Input value={dishName} onChange={(e) => setDishName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Цена">
          <Input value={dishPrice} onChange={(e) => setDishPrice(e.target.value)} />
        </Form.Item>
        <Form.Item label="Состав">
          <Input />
        </Form.Item>
        <Form.Item label="Описание">
          <TextArea />
        </Form.Item>
        <Form.Item label="Тип блюда">
          <Select value={dishType} onChange={(value) => setDishType(value)}>
            {dishTypes.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Заголовок">
          <Input value={dishTitle} onChange={(e) => setDishTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Описание блюда">
          <TextArea value={dishDescription} onChange={(e) => setDishDescription(e.target.value)} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            action="/upload.do"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length < 1 && (
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
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

export default () => <AddDish />;
