/** @type {import('next').NextConfig} */

const nextConfig = {
  env:{
    NEXT_PUBLIC_EVM_PRIVATE_KEY:process.env.NEXT_PUBLIC_EVM_PRIVATE_KEY,
    NEXT_PUBLIC_EVM_MNEMONIC:process.env.NEXT_PUBLIC_EVM_MNEMONIC,
    NEXT_PUBLIC_ENVIRONMENT:process.env.NEXT_PUBLIC_ENVIRONMENT
  },
  reactStrictMode: true,
}

module.exports = nextConfig
