var PAYTM_STAG_URL = 'https://pguat.paytm.com';
var PAYTM_PROD_URL = 'https://secure.paytm.in';
var MID = 'Prodig41061704221412';
var PAYTM_ENVIORMENT = 'TEST'; // PROD FOR PRODUCTION
var PAYTM_MERCHANT_KEY = '1Q&WSwIn8C2eGTSk';
var WEBSITE = 'prodigy.nitt.edu';
var CHANNEL_ID = 'WEB';
var INDUSTRY_TYPE_ID = 'Retail';
var PAYTM_FINAL_URL = '';
if (PAYTM_ENVIORMENT == 'TEST') {
  PAYTM_FINAL_URL = 'https://securegw-stage.paytm.in/theia/processTransaction';
} else {
  PAYTM_FINAL_URL = 'https://securegw.paytm.in/theia/processTransaction';
}

module.exports = {
  MID: MID,
  PAYTM_MERCHANT_KEY: PAYTM_MERCHANT_KEY,
  PAYTM_FINAL_URL: PAYTM_FINAL_URL,
  WEBSITE: WEBSITE,
  CHANNEL_ID: CHANNEL_ID,
  INDUSTRY_TYPE_ID: INDUSTRY_TYPE_ID
};
