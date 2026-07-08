import { expect, test } from "@playwright/test"

test.describe("mortgage calculator", () => {
  test("loads the calculator screen", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle(/Mortgage Calculator/)
    await expect(
      page.getByRole("heading", { name: "Mortgage Calculator" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Find matching products" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Matched products" })
    ).toBeVisible()
    await expect(page.getByLabel("Property amount")).toHaveValue("300000")
    await expect(page.getByLabel("Deposit")).toHaveValue("60000")
  })

  test("validates the form before calling the API", async ({ page }) => {
    await page.goto("/")

    await page.getByLabel("Property amount").fill("200000")
    await page.getByLabel("Deposit").fill("250000")
    await page.getByRole("button", { name: "Search for products" }).click()

    await expect(
      page.getByText("Deposit must be less than the property value.")
    ).toBeVisible()
    await expect(page.getByText("Shawbrook First-Time Buyer")).toBeHidden()
  })

  test("shows skeletons while loading and then renders matching products", async ({
    page,
  }) => {
    await page.route("**/api/mortgage/calculate", async (route) => {
      await page.waitForTimeout(250)
      await route.continue()
    })

    await page.goto("/")
    await page.getByRole("button", { name: "Search for products" }).click()

    await expect(page.getByTestId("product-skeleton")).toHaveCount(3)
    await expect(page.getByText("Shawbrook First-Time Buyer")).toBeVisible()
    await expect(page.getByText("Standard Residential Fixed")).toBeVisible()
    await expect(page.getByText("4.59%", { exact: true })).toBeVisible()
    await expect(page.getByText("3.89%", { exact: true })).toBeVisible()
    await expect(page.getByText("90%", { exact: true })).toBeVisible()
    await expect(page.getByText("80%", { exact: true })).toBeVisible()
  })

  test("lets the user change dropdown values", async ({ page }) => {
    await page.goto("/")

    const employmentDropdown = page.getByRole("combobox").first()
    await employmentDropdown.click()
    await page.getByRole("option", { name: "Self-Employed" }).click()
    await expect(employmentDropdown).toContainText("Self-Employed")

    const creditDropdown = page.getByRole("combobox").nth(1)
    await creditDropdown.click()
    await page.getByRole("option", { name: "Excellent" }).click()
    await expect(creditDropdown).toContainText("Excellent")
  })

  test("keeps the main fields and desktop panels aligned", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto("/")

    const propertyInput = page.getByLabel("Property amount")
    const employmentDropdown = page.getByRole("combobox").first()
    const creditDropdown = page.getByRole("combobox").nth(1)

    const [inputBox, employmentBox, creditBox] = await Promise.all([
      propertyInput.boundingBox(),
      employmentDropdown.boundingBox(),
      creditDropdown.boundingBox(),
    ])

    expect(inputBox?.height).toBe(44)
    expect(employmentBox?.height).toBe(44)
    expect(creditBox?.height).toBe(44)

    const panels = page.locator("main section")
    const [formPanel, productsPanel] = await Promise.all([
      panels.nth(0).boundingBox(),
      panels.nth(1).boundingBox(),
    ])

    expect(formPanel?.height).toBe(productsPanel?.height)
  })
})
