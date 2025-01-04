import { Page } from "playwright/test";

const UI_DELAY = 2000;

export class ProjectPage {
  constructor(public readonly page: Page, public readonly projectId: string) {}

  async createParrit(name: string) {
    await this.page.getByTestId("addParritButton").click();
    await this.page.getByTestId("name-form-name-input").click();
    await this.page.getByTestId("name-form-name-input").fill(name);
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.page.waitForTimeout(UI_DELAY);
  }

  async createBoard(name: string) {
    await this.page.getByTestId("addBoardButton").click();
    await this.page.getByTestId("name-form-name-input").click();
    await this.page.getByTestId("name-form-name-input").fill(name);
    await this.page.getByRole("button", { name: "OK" }).click();
    await this.page.waitForTimeout(UI_DELAY);
  }

  async recommendPairs() {
    await this.page.getByTestId("recommendPairs").click();
    await this.page.waitForTimeout(UI_DELAY);
  }

  async recordPairs() {
    await this.page.getByTestId("savePairing").click();
    await this.page.waitForTimeout(UI_DELAY);
  }

  async resetPairs() {
    await this.page.getByTestId("resetPairs").click();
    await this.page.waitForTimeout(UI_DELAY);
  }

  async waitForUIUpdate() {
    await this.page.waitForTimeout(UI_DELAY);
  }

  async dragParritToBoard(parritName: string, boardName: string) {
    const dragTarget = this.page.getByTestId(`person-${parritName}`);
    const dropTarget = this.page.getByTestId(`pairingBoard-${boardName}`);
    await dragTarget.dragTo(dropTarget);
    await this.page.waitForTimeout(UI_DELAY);
  }
}
