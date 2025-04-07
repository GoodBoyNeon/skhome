import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const filePath = path.join("data", "orders.json");

export const saveOrder = (order: any) => {
  const dir = path.dirname(filePath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  if (!existsSync(filePath)) {
    writeFileSync(filePath, "[]", {
      encoding: "utf-8",
      flag: "w",
    });
  }

  const oldContent = readFileSync(filePath, "utf-8");
  const contentJSON = JSON.parse(oldContent);
  contentJSON.push(order);

  writeFileSync(filePath, JSON.stringify(contentJSON), "utf-8");
};
