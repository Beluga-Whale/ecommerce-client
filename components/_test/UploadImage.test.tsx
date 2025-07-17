import { render, screen, fireEvent } from "@testing-library/react";
import { UploadImage } from "../UploadImage";

jest.mock("next-cloudinary");

const mockDispatch = jest.fn();
jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

describe("UploadImage", () => {
  it("renders correctly", () => {
    const setImageUpload = jest.fn();
    render(<UploadImage setImageUpload={setImageUpload} />);

    expect(screen.getByText(/Chose your images/i)).toBeInTheDocument();
    expect(screen.getByText(/Click to browse/i)).toBeInTheDocument();
  });

  it("calls open() and triggers onSuccess", () => {
    const setImageUpload = jest.fn();

    render(<UploadImage setImageUpload={setImageUpload} />);

    const uploadBox = screen.getByText(/Click to browse/i).parentElement!;
    fireEvent.click(uploadBox);

    expect(setImageUpload).toHaveBeenCalledTimes(1);
  });
});
