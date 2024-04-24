/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
  images: {
    domains: ["img.freepik.com"],
  },
};

export default nextConfig;
