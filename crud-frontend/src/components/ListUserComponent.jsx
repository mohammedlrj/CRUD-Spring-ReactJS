import React, { useEffect, useState } from "react";
import { deleteUser, listUsers } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const ListUserComponent = () => {
  const [users, setUsers] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewUser() {
    navigator("/add-user");
  }

  function updateUser(id) {
    navigator(`/edit-user/${id}`);
  }

  function removeUser(id) {
    console.log(id);

    deleteUser(id)
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <div className="container">
        <h2 className="text-center">List Of Users</h2>
        <button className="btn btn-primary mb-2" onClick={addNewUser}>
          Add User
        </button>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User First Name</th>
              <th>User Last Name</th>
              <th>User Email</th>
              <th>Update User</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateUser(user.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUserComponent;
