import fs from "fs";

function testB64(url: string) {
  const base64 = Buffer.from(url).toString("base64");
  const unpadded = base64.replace(/=+$/, "");
  const safe = unpadded.replace(/\//g, "_").replace(/\+/g, "-");
  return `https://api.onedrive.com/v1.0/shares/u!${safe}/root/content`;
}

async function check(url: string, name: string) {
  const target = testB64(url);
  console.log(`Checking ${name}:`, target);
  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log(`${name} - Status: ${res.status}, Type: ${res.headers.get("content-type")}, Redirected: ${res.url !== target}`);
    const body = await res.text();
    if (res.status === 200) {
      console.log(`SUCCESS on ${name}! Length:`, body.length);
      fs.writeFileSync(`success_${name}.docx`, body);
    } else {
      console.log(`${name} Error:`, body.slice(0, 300));
    }
  } catch (err) {
    console.error("Err:", err);
  }
}

async function run() {
  const link1 = "https://onedrive.live.com/:w:/g/personal/A182BDAA3D507FAB/IQBylj6R8jTOQKbAKQjJqObhAUAR9RC1IZ9BnAnZZycTzos?e=jb5Ef3";
  const link2 = "https://onedrive.live.com/:w:/g/personal/A182BDAA3D507FAB/IQBylj6R8jTOQKbAKQjJqObhAUAR9RC1IZ9BnAnZZycTzos";
  const link3 = "https://onedrive.live.com/download?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1&e=jb5Ef3";
  const link4 = "https://onedrive.live.com/download?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1&authkey=jb5Ef3";

  await check(link1, "link1");
  await check(link2, "link2");
  await check(link3, "link3");
  await check(link4, "link4");
}
run();
