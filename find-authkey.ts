import fs from "fs";

async function run() {
  const url = "https://onedrive.live.com/:w:/g/personal/A182BDAA3D507FAB/IQBylj6R8jTOQKbAKQjJqObhAUAR9RC1IZ9BnAnZZycTzos?resid=A182BDAA3D507FAB!s913e967234f240cea6c02908c9a8e6e1&ithint=file%2cdocx&e=jb5Ef3&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3cvYy9hMTgyYmRhYTNkNTA3ZmFiL0lRQnlsajZSOGpUT1FLYkFLUWpKcU9iaEFVQVI5UkMxSVo5Qm5BblpaeWNUem9zP2U9amI1RWYz";
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", res.status);
    const text = await res.text();
    fs.writeFileSync("onedrive_unshortened.html", text);
    console.log("File saved. Length:", text.length);
    
    // Check if "authkey" is in the HTML
    const index = text.indexOf("authkey");
    if (index !== -1) {
      console.log("Found authkey near:", text.slice(index - 50, index + 200));
    } else {
      console.log("No authkey literal found.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
