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

  // wait for search parameter to occur
  await page.waitForTimeout(1000);

  // auto-click search button
  await page.click('.btn-search');
  await page.waitForTimeout(1000);

  const res = await page.evaluate((orgName) => {
    const container = document
      .querySelector('.ar__center')
      .querySelectorAll('.card-body');

    for (let card of container) {
      const cardOrganizationLink = card
        .querySelector('a')
        .getAttribute('href')
        .toLowerCase();
      const cardOrganizationName = card.querySelector('a').innerHTML;

      const name1 = orgName.toLowerCase().split(' ').sort();
      const name2 = cardOrganizationName.toLowerCase().split(' ').sort();

      if (name1.length != name2.length) continue;

      for (let i = 0; i < name1.length; i++) {
        if (name1[i] != name2[i]) continue;
      }
      return cardOrganizationLink;
    }
  }, organizationName);

  await browser.close();
  return BASE_URL + res;
};

export default getOrganizationPageUrl;
