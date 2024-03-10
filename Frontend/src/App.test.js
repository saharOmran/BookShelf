import React from "react";
import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Cart from  "../src/component/cart";
 

jest.mock("axios");
describe("Cart Component", () => {
  it("Add an element to DOM ", async () => {
    const result = jest.spyOn(axios, "get");
    result.mockResolvedValueOnce({
      data: {
        name : "Name",
        price: "Price",
      },
    });

    render(<Cart />);
    await waitFor(() => {
      expect(result).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Price")).toBeInTheDocument();
    });
  });

  
  it("delete an element from DOM", async () => {
    const result = jest.spyOn(axios, "delete");
    result.mockResolvedValueOnce({});
    render(<Cart />);

    const trashicon = screen.getByTestId("trash-icon");
    fireEvent.click(trashicon);
    await waitFor(() => {
      expect(result).toHaveBeenCalledTimes(1);
      expect(result).toHaveBeenCalledWith("/api");
    });
  });
});