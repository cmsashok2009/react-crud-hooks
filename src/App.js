import React, { useState } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {
  const usersData = [
    { id: 1, name: 'user 1', username: 'username 1' },
    { id: 2, name: 'user 2', username: 'username 2' },
    { id: 3, name: 'user 3', username: 'username 3' },
  ];

  const initialFormState = { id: null, name: '', username: '' };

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const deleteUser = (id) => {
    setEditing(false);
    const removeIndex = users.findIndex((item) => item.id === id);
    let userList = users.filter((user, index) => index !== removeIndex);
    setUsers(userList);
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    const userList = users.map((user) => (user.id === id ? updatedUser : user));
    setUsers(userList);
  };

  return (
    <div className="container">
      <h1>React CRUD with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable
            users={users}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
