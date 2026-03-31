// functions/play.m3u8.js
export async function onRequest(context) {
  const targetUrl = "https://trox.cinemax6.com:3330/stream/play.m3u8";
  
  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Origin": "https://trox.cinemax6.com",
      "Referer": "https://trox.cinemax6.com/"
    }
  });
  
  // CORS ekle
  const modifiedResponse = new Response(response.body, response);
  modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
  modifiedResponse.headers.set("Content-Type", "application/vnd.apple.mpegurl");
  
  return modifiedResponse;
}
