// src/App.tsx
import { useEffect } from 'react';
import { Select } from 'antd';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import MainStore from './store/mainStore';
import { observer } from 'mobx-react';

const { Option } = Select;

const userStore = new MainStore();

const App: React.FC = observer(() => {
  useEffect(() => {
    userStore.fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={(value) => userStore.setFilterStatus(value as 'all' | 'active' | 'inactive')}
        >
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </div>
      <UserTable store={userStore} />
      <UserModal store={userStore} />
    </div>
  );
});

export default App;