import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 1717;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
