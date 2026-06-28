import { jest, test, expect } from "@jest/globals";

jest.unstable_mockModule("../../supabase.js", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const { getOrdersByUserId } =
  await import("../../src/services/orderService.js");

const { supabase } = await import("../../supabase.js");

test("Obtiene pedido por usuario", async () => {
  const fakeOrders = [
    {
      id: 9,
      user_id: 22,
      empanadas: 18,
    },
  ];

  const order = jest.fn().mockResolvedValue({
    data: fakeOrders,
    error: null,
  });

  const eq = jest.fn().mockReturnValue({
    order,
  });

  const select = jest.fn().mockReturnValue({
    eq,
  });

  supabase.from.mockReturnValue({
    select,
  });

  const result = await getOrdersByUserId(7);

  expect(result).toEqual(fakeOrders);

  expect(eq).toHaveBeenCalledWith("user_id", 7);
});
