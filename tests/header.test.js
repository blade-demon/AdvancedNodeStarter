const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("the header has the correct text", async () => {
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
});

test("clicking login start oauth flow", async () => {
  await page.waitFor(".right a");
  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/https:\/\/github\.com/);
});

test("when signed in, show logout button", async () => {
  await page.login();
  const text = await page.getContentsOf("a[href='/auth/logout']");
  expect(text).toEqual("Logout");
});
