import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setAllUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  useEffect(() => {
    let temp = [...allUsers];

    if (search) {
      temp = temp.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (city) {
      temp = temp.filter((user) =>
        user.address.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    setFilteredUsers(temp);
    setCurrentPage(1); // reset to page 1 on filter
  }, [search, city, allUsers]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {[...new Set(allUsers.map((u) => u.address.city))].map(
              (city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              )
            )}
          </select>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td
                    style={{
                      color:
                        search.toLowerCase() === user.name.toLowerCase()
                          ? "yellow"
                          : "inherit",
                    }}
                  >
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            {pageNumber.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                style={{
                  margin: "4px",
                  background: num === currentPage ? "yellow" : "transparent",
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
