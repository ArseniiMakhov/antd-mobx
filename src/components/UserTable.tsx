// src/components/UserTable.tsx
import React from 'react';
import { Alert, Table, Tag } from 'antd';
import { observer } from 'mobx-react';
import MainStore from '../store/mainStore';
import { User } from '../store/UserDTO';
interface UserTableProps {
  store: MainStore;
}

const UserTable: React.FC<UserTableProps> = observer(({ store }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      sorter: (a: User, b: User) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag style={{width: '100px', textAlign: 'center'}} color={status === 'active' ? 'green' : 'volcano'}>{status}</Tag>
      ),
    },
  ];

  if(store.error) return (
    <Alert 
      style={{width: '50%', margin: '0 auto'}}
      message={store.error}
      type="error"
      closable
      onClose={() => store.fetchUsers()}
    />);

  return (
    <Table
      style={{cursor: 'pointer'}}
      dataSource={store.filteredUsers}
      rowKey={'id'}
      columns={columns}
      pagination={{position: ['bottomCenter']}}
      loading={store.isLoading}
      onRow={(record) => ({
        onClick: () => store.setSelectedUser(record),
      })}
    />
  );
});

export default UserTable;