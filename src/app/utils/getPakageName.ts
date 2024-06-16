const fs = require("fs").promises;

export async function getPackageName() {
  try {
    const data = await fs.readFile("package.json", "utf8");
    const packageJson = JSON.parse(data);
  } catch (err) {
    console.error("Error reading package.json:", err);
  }
}
