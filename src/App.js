import React, { useState, useEffect } from 'react';
import Form from './Components/Form';
import User from './Components/User';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="App">
      <Form
        setUsers={setUsers}
        users={users}
      />
      {users.map(user => {
        return (
          <User
            name={user.name}
            email={user.email}
            id={user.id}
            key={user.id}
            createdDate={user.createdDate}
          />
        )
      })}
    </div>
  );
}

export default App;
