const puppeteer = require("puppeteer");
const userFactory = require("./factories/userFactory");
const sessionFactory = require("./factories/sessionFactory");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("the header has the correct text", async () => {
  const text = await page.$eval("a.brand-logo", el => el.innerHTML);
  expect(text).toEqual("Blogster");
});

test("clicking login start oauth flow", async () => {
  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/https:\/\/github\.com/);
});

test("when signed in, show logout button", async () => {
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  await page.setCookie({ name: "session", value: session });
  await page.setCookie({ name: "session.sig", value: sig });
  await page.goto("http://localhost:3000");
  await page.waitFor("a[href='/auth/logout']");

  const text = await page.$eval("a[href='/auth/logout']", el => el.innerHTML);
  expect(text).toEqual("Logout");
});
