/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    images: { domains: ['firebasestorage.googleapis.com'], },
    // https://creativedesignsguru.com/deploy-your-next-js-application-in-subfolder/
    basePath: '/spark-frontend'
  }
  
  export default nextConfig