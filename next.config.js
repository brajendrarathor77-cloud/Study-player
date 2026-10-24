module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://studyaura.online/api/:path*',
      },
    ];
  },
};
