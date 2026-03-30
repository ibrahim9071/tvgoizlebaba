export default {
  async fetch(request) {
    const BASE_URL = "https://trox.cinemax6.com:3330/stream/";
    const url = new URL(request.url);

    let targetUrl;

    if (url.pathname === "/" || url.pathname.endsWith(".m3u8")) {
      targetUrl = BASE_URL + "play.m3u8";
    } else {
      targetUrl = BASE_URL + url.pathname.split("/").pop();
    }

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://trox.cinemax6.com/"
      }
    });

    let contentType = response.headers.get("content-type");

    if (contentType.includes("application/vnd.apple.mpegurl")) {
      let text = await response.text();

      // TS linklerini yeniden yaz
      text = text.replace(/(.*\.ts)/g, (match) => {
        return request.url.replace(/\/[^\/]*$/, "/" + match);
      });

      return new Response(text, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};