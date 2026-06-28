import { jest, test, expect } from "@jest/globals";

jest.unstable_mockModule("../../supabase.js", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const { loginUser } = await import("../../src/services/authService.js");

const { supabase } = await import("../../supabase.js");

test("Login values match", async () => {
  const fakeUser = {
    id: 8,
    name: "Abraham",
    password: "1234",
  };

  const maybeSingle = jest.fn().mockResolvedValue({
    data: fakeUser,
    error: null,
  });

  const eqPass = jest.fn().mockReturnValue({
    maybeSingle,
  });

  const eqName = jest.fn().mockReturnValue({
    eq: eqPass,
  });

  const select = jest.fn().mockReturnValue({
    eq: eqName,
  });

  supabase.from.mockReturnValue({
    select,
  });

  const result = await loginUser({
    name: "Abraham",
    password: "1234",
  });

  expect(result).toEqual(fakeUser);
});
