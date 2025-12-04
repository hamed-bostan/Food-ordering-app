import { test, expect } from "@playwright/test";

test.describe("Restaurant Menu Page", () => {
  test("renders mocked products correctly", async ({ page }) => {
    await page.route("**/api/products", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Products fetched successfully",
          result: [
            {
              id: "1",
              category: "پیتزاها",
              title: "پیتزا روکولا",
              description: "اسفناج، سبزی روکولا، آرد، پودر",
              price: 195000,
              discount: 12,
              score: 1,
              mostsale: false,
              image: "/pizza.jpg",
              createdAt: new Date().toISOString(),
            },
          ],
        }),
      })
    );

    await page.goto("/menu");

    // Title (h3)
    await expect(page.getByRole("heading", { name: "پیتزا روکولا" })).toBeVisible();

    // Description: sliced to the first 10 chars
    const slicedDescription = "اسفناج، سب ..."; // exactly what UI shows
    await expect(page.getByText(slicedDescription)).toBeVisible();
  });
});
