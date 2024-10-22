import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/config/schema.jsx",
  dbCredentials: {
    url: 'postgresql://storystream-DB_owner:41ypBtQMAFoX@ep-delicate-cherry-a5i8g1jr.us-east-2.aws.neon.tech/storystream-DB?sslmode=require',
  },
  verbose: true,
  strict: true,
})