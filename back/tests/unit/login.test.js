import { loginUser } from "../../src/services/authService.js";
import { describe, jest, test } from "@jest/globals";
import { supabase } from "../../supabase.js";

jest.mock("../../supabase.js", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

test("Login values match", async () => {
  const maybeSingle = jest.fn().mockResolvedValue({
    data: null,
    error: new Error("DB error"),
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

  await expect(
    loginUser({
      name: "Abraham",
      password: "123412341234",
    }),
  ).rejects.toThrow("DB Error");
});
