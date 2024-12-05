import createApp from "@/lib/create-app";

const app = createApp();

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

export default app;
