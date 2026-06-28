import { test, expect } from "@playwright/test";

test("El usuario inicia sesión, crea pedido y lo ve en el historial", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveURL("/");

  await page
    .getByRole("link", {
      name: "Login",
    })
    .click();

  await expect(page).toHaveURL("/login");

  await page.getByPlaceholder("Nombre").fill("Codis");

  await page.getByPlaceholder("Contrasena").fill("codis123");

  await page
    .getByRole("button", {
      name: "Iniciar sesion",
    })
    .click();

  await expect(page).toHaveURL("/");

  await page
    .getByRole("button", {
      name: /Carne/,
    })
    .click();

  const pedido = page.locator("#pedido");

  await expect(pedido.getByText("Carne")).toBeVisible();

  await page
    .getByRole("button", {
      name: "Agregar Carne",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Efectivo",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Retiro en local",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Enviar pedido",
    })
    .click();

  await expect(page.getByText("Pedido guardado correctamente")).toBeVisible();

  const historial = page.locator("#historial");

  const ultimoPedido = historial.locator("article").first();

  await expect(ultimoPedido.getByText("Carne")).toBeVisible();

  await expect(ultimoPedido.getByText("x2")).toBeVisible();

  await expect(ultimoPedido.getByText("Pago: Efectivo")).toBeVisible();

  await expect(ultimoPedido.getByText("Entrega: Retiro")).toBeVisible();
});
