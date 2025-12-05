import { test, expect } from "@playwright/test";

test.describe("Restaurant Menu Page", () => {
  const mockProducts = [
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
    {
      id: "2",
      category: "ساندویچ‌ها",
      title: "ساندویچ کتلت",
      description: "سیب زمینی، لوبیا قرمز،  بلغور گندم، نعناع خشک، پودر زیره، پودر جوز هندی، گوجه فرنگی، روغن زیتون",
      price: 230000,
      discount: 18,
      score: 2,
      mostsale: true,
      image: "/sandwich.jpg",
      createdAt: new Date().toISOString(),
    },
  ];

  test.beforeEach(async ({ page }) => {
    await page.route("**/api/products", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "ok",
          result: mockProducts,
        }),
      })
    );
  });

  // 1️⃣ Renders products
  test("renders mocked products correctly", async ({ page }) => {
    await page.goto("/menu");

    await expect(page.getByRole("heading", { name: "پیتزا روکولا" })).toBeVisible();

    const slicedDescription = "اسفناج، سب ...";
    await expect(page.getByText(slicedDescription)).toBeVisible();
  });

  // 2️⃣ Filters by category
  test("filters products by category", async ({ page }) => {
    await page.goto("/menu");

    await page.getByRole("button", { name: "پیتزاها" }).click();

    // Pizza visible
    await expect(page.getByText("پیتزا روکولا")).toBeVisible();

    // Sandwich NOT visible
    await expect(page.getByText("ساندویچ کتلت")).not.toBeVisible();

    // Also check description sliced
    await expect(page.getByText("سیب زمینی، ...")).not.toBeVisible();
  });
});
