export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetBase = "https://trox.cinemax6.com:3330";
    
    // Gelen path'i hedefe ekle
    const targetUrl = targetBase + url.pathname;
    
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Origin": targetBase,
        "Referer": targetBase + "/"
      }
    });
    
    // Eğer m3u8 dosyasıysa, içindeki segment URL'lerini değiştir
    if (url.pathname.endsWith('.m3u8')) {
      let text = await response.text();
      // Segment linklerini worker'ın üzerinden geçir
      text = text.replace(/^(?!https?:\/\/)(.+\.ts)/gm, (match) => {
        return `https://${url.hostname}/${match}`;
      });
      
      return new Response(text, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    
    return response;
  }
}
