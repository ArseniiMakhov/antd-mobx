// src/stores/UserStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { User } from './UserDTO';
import { faker } from '@faker-js/faker';

class MainStore {
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = false;
  error = '';
  selectedUser: User | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.isLoading = true;
    this.error = '';
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fakeUsers = Array.from({ length: 50 }, () => this.createFakeUser());
      runInAction(() => {
        this.users = fakeUsers;
        this.filterUsers(fakeUsers);
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to fetch users';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  createFakeUser(): User {
    return {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      registrationDate: faker.date.past().toISOString(),
      status: faker.datatype.boolean() ? 'active' : 'inactive',
      phone: faker.phone.number({style: 'international'}),
      address: faker.location.streetAddress(),
      activityHistory: Array.from({ length: 5 }, () => faker.lorem.sentence()),
    };
  }

  filterUsers(users: User[], status: 'all' | 'active' | 'inactive' = 'all') {
    let filteredUsers = users;
    if (status !== 'all') {
      filteredUsers = users.filter(user => user.status === status);
    }
    this.filteredUsers = filteredUsers;
  }

  setSelectedUser(user: User | null) {
    this.selectedUser = user;
  }
}

export default MainStore;