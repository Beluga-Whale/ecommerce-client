import { UserProfileDTO } from "@/types";
import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import CardDetailUserProfile from "../CardDetailUserProfile";

const userProfileMock: UserProfileDTO = {
  userId: 1,
  email: "test@gmail.com",
  firstName: "TestFirstName",
  lastName: "TestLastName",
  phone: "0938472345",
  birthDate: dayjs(),
  avatar: "Test",
};
describe("CarDetailUserProfile", () => {
  it("Should render correct", () => {
    render(<CardDetailUserProfile userProfile={userProfileMock} />);

    expect(screen.getByText(/FirstName - LastName/i)).toBeInTheDocument();
    expect(screen.getByText(/TestFirstName TestLastName/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/0938472345/i)).toBeInTheDocument();
  });

  it("Phone is undefined", () => {
    render(<CardDetailUserProfile userProfile={undefined} />);

    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
