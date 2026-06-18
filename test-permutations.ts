import fs from "fs";

async function check(url: string, name: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log(`${name} - Status: ${res.status}, Type: ${res.headers.get("content-type")}, Final URL: ${res.url}`);
    const firstChars = await res.clone().text().then(t => t.slice(0, 100));
    console.log(`${name} heading:`, firstChars);
    if (res.status === 200 && (res.headers.get("content-type") || "").includes("word") || (res.headers.get("content-type") || "").includes("octet-stream")) {
      const arr = await res.arrayBuffer();
      // Docx files start with PK (zip header)
      if (Buffer.from(arr).slice(0, 2).toString() === "PK") {
         fs.writeFileSync("downloaded_real.docx", Buffer.from(arr));
         console.log(`Successfully downloaded REAL docx via ${name}!`);
         return true;
      }
    }
  } catch (err) {
    console.error(`${name} - Error:`, err);
  }
  return false;
}

async function run() {
  const resid = "A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1";
  const cid = "A182BDAA3D507FAB";
  const e = "jb5Ef3";
  
  // Try combinations:
  // 1. standard download?cid=...&id=...&authkey=...
  // 2. download.aspx?cid=...&id=...&authkey=...
  // 3. download?resid=...&authkey=...
  // 4. download.aspx?resid=...&authkey=...
  
  const tests = {
    t1: `https://onedrive.live.com/download?cid=${cid}&id=${resid}&authkey=${e}`,
    t2: `https://onedrive.live.com/download.aspx?cid=${cid}&id=${resid}&authkey=${e}`,
    t3: `https://onedrive.live.com/download?resid=${resid}&authkey=${e}`,
    t4: `https://onedrive.live.com/download.aspx?resid=${resid}&authkey=${e}`,
    t5: `https://onedrive.live.com/download?cid=${cid}&id=${resid}&e=${e}`,
    t6: `https://onedrive.live.com/download?resid=${resid}&e=${e}`,
    
    // Also try substituting authkey with !s913e967234f240cea6c02908c9a8e6e1 or jb5Ef3
    t7: `https://onedrive.live.com/download?cid=${cid}&id=${resid}&authkey=!s913e967234f240cea6c02908c9a8e6e1`,
    t8: `https://onedrive.live.com/download?resid=${resid}&authkey=!s913e967234f240cea6c02908c9a8e6e1`
  };

  for (const [name, url] of Object.entries(tests)) {
    const ok = await check(url, name);
    if (ok) break;
  }
}
run();
