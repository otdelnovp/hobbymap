import { getProfileLetters } from "./get-profile-letters";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfileLetters({
      email: "pavel.otdelnov@gmail.com",
    });

    expect(res).toEqual("PO");
  });

  test("should split by -", () => {
    const res = getProfileLetters({
      email: "pavel.otdelnov@gmail.com",
      name: "Pavel-Otdelnov",
    });

    expect(res).toEqual("PO");
  });

  test("should split by _", () => {
    const res = getProfileLetters({
      email: "pavel.otdelnov@gmail.com",
      name: "Pavel_Otdelnov",
    });

    expect(res).toEqual("PO");
  });

  test("should split by space", () => {
    const res = getProfileLetters({
      email: "pavel.otdelnov@gmail.com",
      name: "Pavel Otdelnov",
    });

    expect(res).toEqual("PO");
  });

  test("should return first 2 letters if no separator", () => {
    const res = getProfileLetters({
      email: "pavel.otdelnov@gmail.com",
      name: "PavelOtdelnov",
    });

    expect(res).toEqual("PA");
  });
  test("should return first 2 letters if no separator email", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
    });

    expect(res).toEqual("AD");
  });
  test("should return email if empty username", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "",
    });

    expect(res).toEqual("AD");
  });

  test("should work with short names", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "P",
    });

    expect(res).toEqual("P");
  });
});
