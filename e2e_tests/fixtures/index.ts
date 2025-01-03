/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectPage } from "./ProjectPage";
import { test as base, expect as baseExpect, Page } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

const UI_DELAY = 2000;

type ParritFixtures = {
  freshPage: Page;
  cleanProject: ProjectPage;
  withPairingHistory: ProjectPage;
};

export const test = base.extend<ParritFixtures>({
  freshPage: async ({ context }, use) => {
    const page = await context.newPage();
    await page.context().clearCookies();
    await use(page);
    await page.close();
  },
  cleanProject: async ({ freshPage }, use) => {
    const projectName = "playwright-" + uuidv4();
    const password = "parrit";

    // create a project
    await freshPage.goto("/");
    await freshPage.getByTestId("goToSignup").click();
    await freshPage.getByTestId("projectName").click();
    await freshPage.getByTestId("projectName").fill(projectName);
    await freshPage.getByTestId("projectName").press("Tab");
    await freshPage.getByTestId("password").fill(password);
    await freshPage.getByTestId("submit").click();
    await freshPage.getByTestId("banner-action").click();
    // get the project id from the url
    const url = freshPage.url();
    const match = url.match(/project\/(.*)/);
    if (!match) {
      throw new Error("Failed to create project");
    }
    const projectId = match[1];

    const projectPage = new ProjectPage(freshPage);

    // setup baseline parrits
    await projectPage.createParrit("Alice");
    await projectPage.createParrit("Bob");
    await projectPage.createBoard("Macaw");

    await use(projectPage);

    // delete the project
    await freshPage.goto(`/project/${projectId}/delete`);
    await freshPage.getByTestId("delete-project").click();
    await freshPage.getByTestId("confirm-delete").click();
    await freshPage.waitForURL("/home/login", { timeout: 30000 });
  },

  withPairingHistory: async ({ cleanProject }, use) => {
    await cleanProject.recommendPairs();
    await cleanProject.recordPairs();
    await cleanProject.resetPairs();

    await use(cleanProject);
  },
});

export const expect = baseExpect.extend({
  async boardContainsAll(
    projectPage: ProjectPage,
    boardName: string,
    ...parritNames: string[]
  ) {
    const assertionName = "boardContainsAll";
    let pass = true;
    const page = projectPage.page;
    // wait for page to exist
    const board = page.getByTestId(`pairingBoard-${boardName}`);
    const received = await board.textContent();

    if (!received) {
      throw new Error(`Board ${boardName} not found`);
    }

    if (this.isNot) {
      for (const parritName of parritNames) {
        if (received.includes(parritName)) {
          pass = false;
          break;
        }
      }
    } else {
      for (const parritName of parritNames) {
        if (!received.includes(parritName)) {
          pass = false;
          break;
        }
      }
    }

    let expected = `${boardName}: [${parritNames.join(", ")}]`;
    if (this.isNot) {
      expected = `NOT ${expected}`;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Expected: board: ${boardName} to NOT contain ALL [${parritNames.join(
            ", "
          )}]\n`
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          "\n\n" +
          `Expected: board: ${boardName} to contain ALL [${parritNames.join(
            ", "
          )}]\n`;
    return {
      message,
      pass,
      name: assertionName,
      expected,
      received,
    };
  },
  async pairingHistoryContains(
    { page }: ProjectPage,
    boardName: string,
    ...parritNames: string[]
  ) {
    const assertionName: string = "pairingHistoryContains";
    // testid is deterministic, so we can use it to find the correct pairing history
    const snippet = [boardName, ...parritNames]
      .map((name) => name.slice(0, 3))
      .sort()
      .join("-")
      .toLowerCase();
    try {
      await expect(page.getByTestId("historyButton")).toBeVisible();
      await page.getByTestId("historyButton").click();
    } catch (e: any) {
      return {
        ...e,
        name: assertionName,
        pass: false,
        message: () => `Expected history button to be visible`,
      };
    }
    await page.waitForTimeout(UI_DELAY);
    try {
      await expect(page.getByTestId("pairingHistoryPanel")).toHaveClass(
        /panel-open/
      );
    } catch (e: any) {
      return {
        ...e,
        name: assertionName,
        pass: false,
        message: () => `Expected history panel to be open`,
      };
    }
    try {
      await expect(page.getByTestId(`record-${snippet}`)).toBeVisible();
    } catch (e: any) {
      return {
        ...e,
        name: assertionName,
        pass: false,
        message: () =>
          `Expected pairing history to contain an element with testid [record-${snippet}]`,
      };
    }
    try {
      await expect(page.getByTestId(`record-${snippet}`)).toContainText(
        boardName
      );
    } catch (e: any) {
      return {
        ...e,
        name: assertionName,
        pass: false,
        message: () => `Expected [record-${snippet}] to contain [${boardName}]`,
      };
    }
    for (const parritName of parritNames) {
      try {
        await expect(page.getByTestId(`record-${snippet}`)).toContainText(
          parritName
        );
      } catch (e: any) {
        return {
          ...e,
          name: assertionName,
          pass: false,
          message: () =>
            `Expected [record-${snippet}] to contain [${parritName}]`,
        };
      }
    }
    await page.getByTestId("historyButton").click();
    await page.waitForTimeout(UI_DELAY);
    try {
      await expect(page.getByTestId("pairingHistoryPanel")).toHaveClass(
        /panel-closed/
      );
    } catch (e: any) {
      return {
        ...e,
        name: assertionName,
        pass: false,
        message: () => `Expected history panel to be closed`,
      };
    }

    return {
      pass: true,
      name: assertionName,
    };
  },
});

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      boardContainsAll(boardName: string, ...parritNames: string[]): Promise<R>;
      pairingHistoryContains(
        boardName: string,
        ...parritNames: string[]
      ): Promise<R>;
    }
  }
}
