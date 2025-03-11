export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.ts",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  },
};
