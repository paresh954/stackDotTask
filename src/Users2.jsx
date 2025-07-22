// Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Users2 = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setAllUsers(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtering Logic
  useEffect(() => {
    let filtered = allUsers;

    if (search) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (city) {
      filtered = filtered.filter((user) =>
        user.address.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    setUsers(filtered);
    setCurrentPage(1);
  }, [search, city, allUsers]);

  // Pagination Logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>User List</h2>

      {loading ? (
        <div style={{ fontWeight: "bold" }}>🔄 Loading users...</div>
      ) : (
        <>
          {/* Search and Filter */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginRight: "10px", padding: "5px" }}
            />

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Cities</option>
              {[...new Set(allUsers.map((u) => u.address.city))].map(
                (city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Table */}
          <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#eee" }}>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td>{highlightText(user.name, search)}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: "20px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  backgroundColor: currentPage === page ? "#000" : "#eee",
                  color: currentPage === page ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Users2;
