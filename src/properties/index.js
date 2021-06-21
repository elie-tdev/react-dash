export const env = process.env.NODE_ENV;

export const formatShortDateString = 'mmm dd';
export const formatDateString = 'mediumDate';
export const formatDateMonthYearString = 'mm/dd/yyyy';
export const formatMediumDateMonthString = 'mmm dd, yyyy';
export const formatLongDateString = 'yyyymmdd';
export const formatLongDateMonthString = 'mmmm dd, yyyy';
export const formatMonthYearString = 'mmmm yyyy';

export const frequency = freq => {
  switch (freq) {
    case 'MO':
      return 'Monthly';
    case 'BW':
      return 'Bi-Weekly';
    case 'SM':
      return 'Semi-Monthly';
    case 'S4':
      return 'Semi-Monthly';
    default:
      return null;
  }
};

/**
 * Load appropriate API URL for environment
 *
 * Load order:
 * - window config
 * - REACT_APP__API_URL environment variable
 * - sensible default (dev environment, only accessible over VPN)
 *
 * todo: change sensible default from dev to production when system is more stable
 */
let envApiUrl = '';
let AUTH0_DOMAIN;
let AUTH0_CLIENT_ID;
let AUTH0_AUDIENCE;

if (Object.prototype.hasOwnProperty.call(window, 'DataSource')) {
  envApiUrl = window['DataSource'].apiUrl;
  AUTH0_DOMAIN = window['DataSource'].REACT_APP_AUTH0_DOMAIN;
  AUTH0_CLIENT_ID = window['DataSource'].REACT_APP_AUTH0_CLIENT_ID;
  AUTH0_AUDIENCE = window['DataSource'].REACT_APP_AUTH0_AUDIENCE;
} else {
  envApiUrl = process.env.REACT_APP_DASHBOARD_API_URL;
  AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
  AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
  AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
}

export const apiUrl = envApiUrl;
export const REACT_APP_AUTH0_DOMAIN = AUTH0_DOMAIN;
export const REACT_APP_AUTH0_CLIENT_ID = AUTH0_CLIENT_ID;
export const REACT_APP_AUTH0_AUDIENCE = AUTH0_AUDIENCE;
