import fs from "fs";

function getSharesUrl(sharingUrl: string) {
  const base64 = Buffer.from(sharingUrl).toString("base64");
  const unpadded = base64.replace(/=+$/, "");
  const safe = unpadded.replace(/\//g, "_").replace(/\+/g, "-");
  return `https://api.onedrive.com/v1.0/shares/u!${safe}/root/content`;
}

async function run() {
  const sharingUrl = "https://1drv.ms/w/c/a182bdaa3d507fab/IQBylj6R8jTOQKbAKQjJqObhAUAR9RC1IZ9BnAnZZycTzos?e=jb5Ef3";
  const url = getSharesUrl(sharingUrl);
  console.log("OneDrive Graph Shares URL:", url);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", res.status);
    console.log("Type:", res.headers.get("content-type"));
    console.log("Length:", res.headers.get("content-length"));
    console.log("Final URL:", res.url);
    if (res.status === 200 || res.status === 302) {
      const arr = await res.arrayBuffer();
      fs.writeFileSync("downloaded2.docx", Buffer.from(arr));
      console.log("Successfully downloaded direct DOCX via shares api!");
      
      // Let's also try to get details of the item:
      const metaUrl = `https://api.onedrive.com/v1.0/shares/u!${Buffer.from(sharingUrl).toString("base64").replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-")}/driveItem`;
      const metaRes = await fetch(metaUrl);
      const metaJson = await metaRes.json();
      console.log("Meta JSON:", JSON.stringify(metaJson, null, 2));
    } else {
      const text = await res.text();
      console.log("Error text:", text.slice(0, 1000));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
