module.exports = {
  ci: {
    collect: {
      url: ['https://www.parking24.me'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};