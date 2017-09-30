export const CONFIG = {
  STUDENT: 'stu',
  ENTREPRENEUR: 'ent',
  UNKNOWN: 'unknown',
  WIZARD: {
    STEPS: {
      GENERAL: 1,
      INFO: 2,
      DESIGN: 3,
      MILESTONES: 4,
      FINAL: 5
    },
    PRICING: [
      {devs: 1, maxStones: 3, ourPrice: 750, marketPrice: 4000},
      {devs: 1, maxStones: 5, ourPrice: 950, marketPrice: 5000},
      {devs: 2, maxStones: 3, ourPrice: 1500, marketPrice: 8000},
      {devs: 2, maxStones: 5, ourPrice: 1900, marketPrice: 10000},
      {devs: 3, maxStones: 3, ourPrice: 2250, marketPrice: 12000},
      {devs: 3, maxStones: 5, ourPrice: 2850, marketPrice: 15000},
      {devs: 4, maxStones: 3, ourPrice: 3000, marketPrice: 17000},
      {devs: 4, maxStones: 5, ourPrice: 3800, marketPrice: 20000},
      {devs: 5, maxStones: 3, ourPrice: 4000, marketPrice: 23000},
      {devs: 5, maxStones: 5, ourPrice: 4750, marketPrice: 25000},
    ],
    MILESTONE_BREAKPOINT: 3,
    MAX_MILESTONES: 5,
    DEFAULT_TIMESPAN: 1,
    MIN_TIMESPAN: 1,
    MAX_TIMESPAN: 5
  },
  PROJECT: {
    PENDING: 'pending',
    APPROVED: 'approved',
    IN_WORK: 'in_work',
    DONE: 'done',
    PENDING_TEXT: 'Pending approval',
    APPROVED_TEXT: 'Approved',
    IN_WORK_TEXT: 'In work',
    DONE_TEXT: 'All Done!'
  },
  THEME: {
    COLOR1: '#f08525'
  },
  ASSETS: {
    LOGO: '/assets/img/eaziup-logo.png'
  },
  AUTH: {
    CLIENT_ID: 'pcS7W7BJrWqD88fHf-z8MhDIZ-GK07h3',
    DOMAIN: 'eaziup.auth0.com'
  },
  FORM: {
    IS_SHOW_ONE_ERROR: true
  },
  DEFAULTS: {
    DEV_COUNT: '2'
  },
  OS: [
    {key: 'win', label: 'Windows'},
    {key: 'linux', label: 'Linux'},
    {key: 'macos', label: 'macOS'},
    {key: 'winMobile', label: 'Windows Mobile'},
    {key: 'android', label: 'Android'},
    {key: 'ios', label: 'iOS'}
  ],
  DEV_COUNT: [
    {key: '1', label: '1'},
    {key: '2', label: '2'},
    {key: '3', label: '3'},
    {key: '4', label: '4'},
    {key: '5', label: '5'}
  ],
  ERRORS: {
    TOKEN_NOT_VERIFIED: 20
  }
};
