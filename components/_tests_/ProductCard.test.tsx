import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";

// mock next/link
jest.mock("next/link", () => {
  return ({ children }: any) => children;
});

// mock toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

// mock zustand
const addToCartMock = jest.fn();

jest.mock("@/store/cartStore", () => ({
  useCartStore: (selector: any) =>
    selector({
      addToCart: addToCartMock,
    }),
}));

describe("ProductCard", () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    thumbnail: "img",
  };

  test("renders product", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  test("click add to cart", () => {
    render(<ProductCard product={product} />);
    fireEvent.click(screen.getByText(/add to cart/i));
    expect(addToCartMock).toHaveBeenCalled();
  });
});