#! /usr/bin/env node

const process = require("process");
const puppeteer = require("puppeteer");
const dayjs = require("dayjs");
const sleep = require("sleep-promise");
const { beep } = require("a1-beep");
const open = require("open");

require("dayjs/locale/fr");
dayjs.locale("fr");

const WAIT_MS = 60 * 1000;

const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.log("Usage:");
  console.log("  npm start url1 url2");
  console.log("You can pass as many urls as you want");
  process.exit(2);
}

const createBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });
  return browser;
};

const checkNextAppointement = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(".first-availability");
  const nextAppointementString = await page.$eval(
    ".first-availability .date",
    (el) => {
      return el.textContent.replace(/^[a-zA-Z]+ /, "");
    }
  );
  const centerName = await page.$eval("h1.name span", (el) => el.textContent);
  console.log(
    `> [${dayjs().format(
      "HH:mm"
    )}] ${centerName} : Prochain rendez-vous le ${nextAppointementString}`
  );
  const today = dayjs().format("DD MMMM");
  const tomorrow = dayjs().add(1, "day").format("DD MMMM");
  if (nextAppointementString === today || nextAppointementString === tomorrow) {
    open(url);
    beep("....");
  }
  page.close();
};

const startCheckingNextAppointment = async (browser, url) => {
  checkNextAppointement(browser, url);
  await sleep(WAIT_MS);
  startCheckingNextAppointment(browser, url);
};

const delayStartChecking = async (minDelaySec = 1, maxDelaySec = 15) => {
  const randomWait = Math.random() * (maxDelaySec - minDelaySec) + minDelaySec;
  await sleep(randomWait * 1000);
};

createBrowser()
  .then((browser) => {
    urls.forEach(async (url) => {
      await delayStartChecking(); // just to avoid all check at the exact same time
      startCheckingNextAppointment(browser, url);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
