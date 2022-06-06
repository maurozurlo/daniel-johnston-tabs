/** @type {import('next').NextConfig} */
module.exports = {
  images:{
    domains: ['bit.ly', 'res.cloudinary.com']
  },
  env: {
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_PORT: process.env.MYSQL_PORT
  },
  reactStrictMode: true,
}
