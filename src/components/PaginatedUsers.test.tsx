import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaginatedUsers } from "./PaginatedUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Mock axios
jest.mock("axios");
import axios from "axios";
const mockedAxios = axios as jest.Mocked<typeof axios>;

function renderWithClient(ui: React.ReactNode) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

test("loads and displays users", async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: [
      { id: 1, name: "Leanne", email: "leanne@test.com" },
      { id: 2, name: "Ervin", email: "ervin@test.com" },
    ],
  });

  renderWithClient(<PaginatedUsers />);

  await waitFor(() => {
    expect(screen.getByText(/Leanne/)).toBeInTheDocument();
    expect(screen.getByText(/Ervin/)).toBeInTheDocument();
  });
});

test("navigates to next page", async () => {
  mockedAxios.get
    .mockResolvedValueOnce({
      data: [
        { id: 1, name: "Leanne", email: "leanne@test.com" },
        { id: 2, name: "Ervin", email: "ervin@test.com" },
      ],
    })
    .mockResolvedValueOnce({
      data: [{ id: 3, name: "Clementine", email: "clementine@test.com" }],
    });

  renderWithClient(<PaginatedUsers />);

  await waitFor(() => {
    expect(screen.getByText(/Leanne/)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Next"));

  await waitFor(() => {
    expect(screen.getByText(/Clementine/)).toBeInTheDocument();
  });
});
