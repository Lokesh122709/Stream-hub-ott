async function run() {
  const url = "https://1drv.ms/w/c/a182bdaa3d507fab/IQBylj6R8jTOQKbAKQjJqObhAUAR9RC1IZ9BnAnZZycTzos?e=jb5Ef3";
  try {
    const res = await fetch(url, {
      redirect: "manual",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", res.status);
    console.log("Location:", res.headers.get("location"));
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
