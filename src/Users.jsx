import axios from "axios";
import React, { useEffect } from "react";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [city, setCity] = React.useState("");
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const data = await res.data;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const filterUser = () => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  const filterCitys = () => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const filterCity = users.filter((user) => {
      return user.address.city.toLowerCase().includes(city.toLowerCase());
    });
    setUsers(filterCity);
  }, [city]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setUsers(filteredUsers);
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <input type="text" value={search} onChange={filterUser} />
          <select onChange={filterCitys}>
            <option>City</option>
            {users.map((user) => (
              <option key={user.id} value={user.address.city}>
                {user.address.city}
              </option>
            ))}
          </select>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>

            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
