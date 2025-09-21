import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchUsers } from "./SearchUsers";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: "Leanne", email: "leanne@test.com" },
        { id: 2, name: "Ervin", email: "ervin@test.com" },
      ]),
  })
) as jest.Mock;

test("renders multiple users from fetch", async () => {
  render(<SearchUsers />);

  const input = screen.getByPlaceholderText("Search users...");
  fireEvent.change(input, { target: { value: "Leanne" } });

  await waitFor(() => {
    expect(screen.getByText(/Leanne/)).toBeInTheDocument();
    expect(screen.getByText(/Ervin/)).toBeInTheDocument();
  });
});
