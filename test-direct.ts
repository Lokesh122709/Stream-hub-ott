import fs from "fs";

async function check(url: string, name: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log(`${name} - Status: ${res.status}, Type: ${res.headers.get("content-type")}, Length: ${res.headers.get("content-length")}, Final URL: ${res.url}`);
    if (res.status === 200 && (res.headers.get("content-type") || "").includes("word") || res.headers.get("content-type") === "application/octet-stream") {
      const arr = await res.arrayBuffer();
      fs.writeFileSync("downloaded.docx", Buffer.from(arr));
      console.log(`Successfully downloaded ${name}!`);
      return true;
    }
  } catch (err) {
    console.error(`${name} - Error:`, err);
  }
  return false;
}

async function run() {
  // Try different direct link variations for OneDrive:
  // 1. download?resid=...&authkey=... where we try using 'e' as authkey
  const url1 = "https://onedrive.live.com/download?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1&authkey=!s913e967234f240cea6c02908c9a8e6e1";
  const url2 = "https://onedrive.live.com/download?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1&e=jb5Ef3";
  const url3 = "https://onedrive.live.com/download?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1&authkey=jb5Ef3";
  const url4 = "https://onedrive.live.com/download?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1";
  
  // Actually, some OneDrive download formats:
  // "https://onedrive.live.com/download?cid=A182BDAA3D507FAB&id=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1...
  
  await check(url1, "url1");
  await check(url2, "url2");
  await check(url3, "url3");
  await check(url4, "url4");
}
run();
