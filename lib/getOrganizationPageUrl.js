import puppeteer from 'puppeteer';
/**
 * Receive an organization name and return its page url from äriregister.rik.ee.
 * @param {string} organizationName
 * @returns {string} page url
 */
const getOrganizationPageUrl = async (organizationName) => {
  const BASE_URL = 'https://ariregister.rik.ee';

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // auto-type organization name into search bar
  await page.goto(`${BASE_URL}/est`);
  await page.type('#company_search', organizationName);
  // auto-click search button
  await page.click('.btn-search');
  await page.waitForTimeout(1000);

  const res = await page.evaluate(() => {
    const container = document
      .querySelector('.ar__center')
      .querySelectorAll('.card-body')[1];
    return container.querySelector('a').getAttribute('href');
  });

  await browser.close();
  return BASE_URL + res;
};

export default getOrganizationPageUrl;
