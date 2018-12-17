const puppeteer = require("puppeteer");

module.exports = async (movieName, year) => {
  const fixedTitleWithYear =
    movieName.replace(/[^\w\s]/g, "").replace(/ /g, "_") + "_" + year;
  const fixedTitleWithoutYear = fixedTitleWithYear.slice(
    fixedTitleWithYear.length - 4
  );
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://rottentomatoes.com/m/" + fixedTitleWithYear);
  await page.waitFor(1000);
  // Scrape

  if (404) {
    //scrape again @ fixedTitleWithoutYear
  }

  browser.close();
  return result;
};

//https://codeburst.io/a-guide-to-automating-scraping-the-web-with-javascript-chrome-puppeteer-node-js-b18efb9e9921
