// src/components/UserModal.tsx
import React from 'react';
import { Modal, Descriptions } from 'antd';
import { observer } from 'mobx-react';
import MainStore from '../store/mainStore';

interface UserModalProps {
  store: MainStore;
}

const UserModal: React.FC<UserModalProps> = observer(({ store }) => {
  const selectedUser = store.selectedUser;

  return (
    <Modal
      title="User Details"
      open={!!selectedUser}
      onCancel={() => store.setSelectedUser(null)}
      footer={null}
    >
      {selectedUser && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{selectedUser.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{selectedUser.address}</Descriptions.Item>
          <Descriptions.Item label="Activity History">
            {selectedUser.activityHistory.join(', ')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
});

export default UserModal;