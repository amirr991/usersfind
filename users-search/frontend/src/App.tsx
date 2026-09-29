import { useState } from "react";
import axios from "axios";

type User = {
  id: number;
  username: string;
  email: string;
};

function App() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [searched, setSearched] = useState(false);

  const findUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/users/",
        {
          params: {
            search: search,
            email: email,
          },
        }
      );

      setUsers(response.data);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Поиск пользователей</h1>

      <input
        placeholder="Username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={findUsers}>
        Найти
      </button>

      <hr />

      {searched && users.length === 0 ? (
        <p>Пользователи не найдены</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h3>👤 {user.username}</h3>
            <p>📧 {user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;