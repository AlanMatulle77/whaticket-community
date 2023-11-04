import { useState, useEffect } from "react";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const useUsers = ({ id, name }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users", {
          params: {
            id,
            name,
          },
        });

        setUsers(data.users);
        setCount(data.count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toastError(err);
      }
    };

    fetchUsers();
  }, [id, name]);

  return { users, loading, count };
};

export default useUsers;
