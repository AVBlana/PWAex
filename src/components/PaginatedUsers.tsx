import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUsers(page: number): Promise<User[]> {
  const { data } = await axios.get<User[]>(
    `http://localhost:1337/users?_page=${page}&_limit=5`
  );
  return data;
}

export function PaginatedUsers() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery<User[]>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    placeholderData: undefined, // keeps old data while fetching new
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users (Page {page})</h2>
      <ul>
        {data?.map((u) => (
          <li key={u.id}>
            {u.name} – {u.email}
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)} disabled={isFetching}>
          Next
        </button>
      </div>
      {isFetching && <p>Loading new page...</p>}
    </div>
  );
}
