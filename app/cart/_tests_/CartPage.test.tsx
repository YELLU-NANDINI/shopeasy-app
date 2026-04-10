import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../page";
const removeMock = jest.fn();
const clearMock = jest.fn();
jest.mock("@/store/cartStore", () => ({
  useCartStore: () => ({
    cartItems: [
      { id: 1, title: "Item 1", price: 100, thumbnail: "img" },
    ],
    removeFromCart: removeMock,
    clearCart: clearMock,
  }),
}));
describe("CartPage", () => {
  test("renders cart item", () => {
    render(<CartPage />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });
  test("removes item", () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText(/remove/i));
    expect(removeMock).toHaveBeenCalled();
  });
  test("clears cart", () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText(/clear/i));
    expect(clearMock).toHaveBeenCalled();
  });
});