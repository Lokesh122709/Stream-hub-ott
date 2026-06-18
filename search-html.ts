import fs from "fs";

function run() {
  const text = fs.readFileSync("onedrive_unshortened.html", "utf8");
  console.log("HTML length:", text.length);
  
  // Find all URLs or suspicious strings in the redirect page
  const regex = /https?:\/\/[^\s"'><]+?/gi;
  let match;
  const urls: string[] = [];
  while ((match = regex.exec(text)) !== null) {
    if (urls.length < 50) {
      urls.push(match[0]);
    } else {
      break;
    }
  }
  console.log("Found URLs:", urls);
}
run();
