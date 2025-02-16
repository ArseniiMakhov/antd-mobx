// src/stores/UserStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { User } from './UserDTO';
import { faker } from '@faker-js/faker';

class MainStore {
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = false;
  error = '';
  filterStatus: 'all' | 'active' | 'inactive' = 'all';
  sortKey: keyof User | null = null;
  sortOrder: 'bottom' | 'up' | null = null;
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
        this.filteredUsers = this.applyFiltersAndSorting(fakeUsers);
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

  applyFiltersAndSorting(users: User[]): User[] {
    let filteredUsers = users;
    if (this.filterStatus !== 'all') {
      filteredUsers = users.filter(user => user.status === this.filterStatus);
    }
    if (this.sortKey && this.sortOrder) {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (a[this.sortKey!] < b[this.sortKey!]) return this.sortOrder === 'bottom' ? -1 : 1;
        if (a[this.sortKey!] > b[this.sortKey!]) return this.sortOrder === 'bottom' ? 1 : -1;
        return 0;
      });
    }
    return filteredUsers;
  }

  setFilterStatus(status: 'all' | 'active' | 'inactive') {
    this.filterStatus = status;
    this.filteredUsers = this.applyFiltersAndSorting(this.users);
  }

  setSort(key: keyof User, order: 'bottom' | 'up' | null) {
    this.sortKey = key;
    this.sortOrder = order;
    this.filteredUsers = this.applyFiltersAndSorting(this.users);
  }

  setSelectedUser(user: User | null) {
    this.selectedUser = user;
  }
}

export default MainStore;