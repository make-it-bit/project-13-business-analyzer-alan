import puppeteer from 'puppeteer';
/**
 * Receive an organization name and return its data in json from äriregister.rik.ee.
 * @param {string} url
 * @returns {JSON} organization data
 */
const getOrganizationData = async (url) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(1000);
  const res = await page.evaluate(() => {
    const container = document
      .querySelector('.ar__center')
      .querySelectorAll('.card')[2];

    // "Üldinfo" container
    let json = '{"Üldinfo":{';
    const generalInfo = container.querySelectorAll('.card-body')[0];
    for (let row of generalInfo.querySelectorAll('.row')) {
      json += `"${row
        .querySelectorAll('*')[0]
        .innerText.trim()
        .replace(/\s/g, '_')}":"${row
        .querySelectorAll('*')[1]
        .innerText.trim()}",`;
    }
    json = json.replace(/\n/g, '. ');
    json = json.replace(/.$/, '');
    json += '},';

    // "Kontaktid" container
    json += '"Kontaktid":{';
    const contactInfo = container.querySelectorAll('.card-body')[1];
    for (let row of contactInfo.querySelectorAll('.row')) {
      json += `"${row
        .querySelectorAll('*')[0]
        .innerText.trim()
        .replace(/\s/g, '_')}":"${row
        .querySelectorAll('*')[1]
        .innerText.trim()}",`;
    }
    json = json.replace(/\n/g, '. ');
    json = json.replace(/.$/, '');
    json += '},';

    // "Maksualane info" container
    json += '"Maksualane_info":{';
    const paymentInfo = container.querySelectorAll('.card-body')[2];
    for (let row of paymentInfo.querySelectorAll('.row')) {
      json += `"${row
        .querySelectorAll('*')[0]
        .innerText.trim()
        .replace(/\s/g, '_')}":"${row
        .querySelectorAll('*')[1]
        .innerText.trim()}",`;
    }
    json = json.replace(/\n/g, '. ');
    json = json.replace(/.$/, '');
    json += '}}';

    // return json
    return JSON.parse(json);
  });
  browser.close();
  return res;
};

export default getOrganizationData;
