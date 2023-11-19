import React , {useState}from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
type DataType = {
  key: number;
  name: string;
  product: number;
  status: string;
};

const ListOrder = () => {
    const [loading, setLoading] = useState(false);
    const data1: DataType[] = [];
    const columns: ColumnsType<DataType> = [
      {
        title: 'Sno',
        dataIndex: 'key',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Product',
        dataIndex: 'product',
      },
      {
        title: 'Status',
        dataIndex: 'status',
      },
    ];
    
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <div>
    <h3 className='mb-4 title'>Order List</h3>
    <div className="">
    <Table columns={columns} dataSource={data1} /> 
    </div>
  </div>
  )
}

export default ListOrder