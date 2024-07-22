require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer');

const downloadPath = process.env.DOWNLOAD_PATH || `${__dirname}/downloads`;

const downloadCSV = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page._client().send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath,
  });
  fs.mkdirSync(downloadPath, { recursive: true });

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("https://myaccount.esbnetworks.ie/Api/HistoricConsumption/");

  await page.locator("#signInName").wait();
  await page.locator("#signInName").fill(process.env.ESB_USER);
  await page.locator("#password").fill(process.env.ESB_PASS);
  await page.locator("#next").click();

  await page.locator("#tabsComponent04").wait();
  await page.locator("img[src='/lib/content/icons/download.svg']").click();

  await page.locator("img[src='/lib/content/icons/downloadbtn.svg']").wait();
  await page.locator("img[src='/lib/content/icons/downloadbtn.svg']").click();

  await new Promise(resolve => setTimeout(resolve, 10000))

  browser.close();
};

const extractJSON = () => {
  const fileName = fs.readdirSync(downloadPath)
    .filter((f) => f.toLowerCase().endsWith(".csv"))
    .sort((a, b) => fs.statSync(`${downloadPath}/${a}`).mtime > fs.statSync(`${downloadPath}/${b}`).mtime ? 1 : -1)
    .pop();
  const filePath = `${downloadPath}/${fileName}`;
  const csv = fs.readFileSync(filePath, "utf-8").trim();
  const readings = csv.split(/\n/gi)
    .slice(1)
    .map((line) => {
      const [mprn, serial, value, readType, date] = line.trim().split(/,/gi)
      return { mprn, serial, value, readType, date }
    });
  const result = {
    mprn: readings[0].mprn,
    serial: readings[0].serial,
    readings: readings.map(({ mprn, serial, value, readType, date }) => ({
      value: parseFloat(value),
      date,
    }))
  }
  fs.writeFileSync(`${downloadPath}/data.json`, JSON.stringify(result));
  fs.unlinkSync(filePath);
};

const main = async () => {
  await downloadCSV();
  await extractJSON();
};

main();
