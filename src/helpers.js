const speakeasy = require('speakeasy');

const isOtpValid = function (base32Secret, otp) {
  return speakeasy.totp.verify({secret: base32Secret, encoding: 'base32', token: otp, window: 1});
};

const getIp = function (req) {
  return req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

const getFingerPrint = function (req) {
  return req.body && typeof req.body.fingerprint === 'string' ? req.body.fingerprint : 'unknown';
};

const isValidUuid = function (id) {
  const uuidV4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return uuidV4Regex.test(id);
};

const sleep = async function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  getIp,
  getFingerPrint,
  isValidUuid,
  isOtpValid,
  sleep
};
