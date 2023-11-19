import React from 'react';
import { Table } from 'antd';

import Column from 'antd/es/table/Column';

const Statistical = () => {
  // Dữ liệu giả và cấu hình bảng và biểu đồ như đã định nghĩa ở trên
  const mockData = [
    {
      key: '1',
      name: 'Sánh 1',
      sales: 40,
      revenue: 500,
    },
    {
      key: '2',
      name: 'Sánh 1',
      sales: 70,
      revenue: 700,
    },
    // Thêm nhiều dữ liệu hơn ở đây
  ];
  const columns = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Doanh số',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
    },
  ];
  const chartConfig = {
    data: mockData,
    xField: 'name',
    yField: 'sales',
    // Các cấu hình khác cho biểu đồ
  };
  return (
    <div>
      <Table dataSource={mockData} columns={columns} />
      <Column {...chartConfig} />
    </div>
  );
};

export default Statistical;
