import { test, expect } from "./fixtures";

test("visits the app", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("Parrit");
});

test("basic login form validation", async ({ loginInfo, freshPage }) => {
  await freshPage.goto("/");

  await freshPage.getByTestId("submit").click();
  await expect(freshPage.getByTestId("project_name_error")).toContainText(
    "Project Name is required."
  );
  await expect(freshPage.getByTestId("password_error")).toContainText(
    "Password is required."
  );

  await freshPage.getByTestId("projectName").click();
  await freshPage.getByTestId("projectName").fill(loginInfo.projectName);
  await freshPage.getByTestId("submit").click();

  await expect(freshPage.getByTestId("project_name_error")).not.toContainText(
    "Project Name is required."
  );
  await expect(freshPage.getByTestId("password_error")).toContainText(
    "Password is required."
  );

  await freshPage.getByTestId("password").click();
  await freshPage.getByTestId("password").fill(loginInfo.password);
  await freshPage.getByTestId("submit").click();

  await expect(freshPage.getByTestId("server_error")).toContainText(
    "Project not found."
  );
});

test("basic signup form validation", async ({ loginInfo, freshPage }) => {
  await freshPage.goto("/");
  await freshPage.getByTestId("goToSignup").click();

  await freshPage.getByTestId("submit").click();
  await expect(freshPage.getByTestId("project_name_error")).toContainText(
    "Project Name is required."
  );
  await expect(freshPage.getByTestId("password_error")).toContainText(
    "Password is required."
  );

  await freshPage.getByTestId("projectName").click();
  await freshPage.getByTestId("projectName").fill(loginInfo.projectName);
  await freshPage.getByTestId("submit").click();

  await expect(freshPage.getByTestId("project_name_error")).not.toContainText(
    "Project Name is required."
  );
  await expect(freshPage.getByTestId("password_error")).toContainText(
    "Password is required."
  );
});

test("advanced form validation", async ({ loginInfo, cleanProject }) => {
  const { page } = cleanProject;
  await page.getByTestId("logout-button").click();
  // await navigation
  page.waitForURL("/home/login");

  await page.getByTestId("projectName").click();
  await page.getByTestId("projectName").fill(loginInfo.projectName);
  await page.getByTestId("password").click();
  await page.getByTestId("password").fill("NOPE_CHUCK_TESTA");
  await page.getByTestId("submit").click();
  await expect(page.getByTestId("server_error")).toContainText(
    "Incorrect password"
  );

  await page.getByTestId("goToSignup").click();
  await page.getByTestId("projectName").click();
  await page.getByTestId("projectName").fill(loginInfo.projectName);
  await page.getByTestId("password").click();
  await page.getByTestId("password").fill(loginInfo.password);
  await page.getByTestId("submit").click();

  await expect(page.getByTestId("server_error")).toContainText(
    "A project with this name already exists."
  );

  // log in for real so that we can delete the project
  await page.getByTestId("goToLogin").click();
  await page.getByTestId("projectName").click();
  await page.getByTestId("projectName").fill(loginInfo.projectName);
  await page.getByTestId("password").click();
  await page.getByTestId("password").fill(loginInfo.password);
  await page.getByTestId("submit").click();
  await page.waitForURL("/project/" + cleanProject.projectId);
});
