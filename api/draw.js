javascript
// api/draw.js
export const config = {
  runtime: 'edge', // 使用 Edge 模式，速度更快
};

export default async function handler(req) {
  // 1. 获取网址里的提示词
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get('prompt');

  if (!prompt) {
    return new Response("请在网址后面加上 ?prompt=你的描述", { status: 400 });
  }

  // ==========================================
  // 【请在这里填入你的密钥】
  // 注意：保留双引号，把你的 pst- 开头的密钥粘贴在中间
  const API_KEY = "pst-tukPB4av3SHUGqk3GotsJKYZrNW1oFUsNnFp1brGtmRVbdu5XaGRlzTH7Ht32Drf"; 
  
  // 【如果你知道这是哪家的接口，请修改下面的网址】
  // 目前默认为 OpenAI DALL-E 3 的官方地址
  const API_URL = "https://api.openai.com/v1/images/generations";
  // ==========================================

  try {
    // 2. 带着你的密钥去请求生图
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,“Authorization”: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",“Content-Type”: “application/json”,
      },
      body: JSON.stringify({
        model: "dall-e-3", // 如果你的密钥不支持dall-e-3，可以改成 dall-e-2
        prompt: `Anime thick coating style, high quality, ${prompt}`, // 强制厚涂画风prompt: `动漫厚涂风格，高质量，${prompt}`, // 强制厚涂画风提示：`动漫厚涂风格，高质量，${prompt}`，// 强制厚涂画风
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(`生图失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });return new Response(`生成图片失败，密钥可能不对或余额不足: ${error}`, { status: 500 });
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    // 3. 拿到图片链接，去下载图片数据
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    // 4. 把图片直接显示出来
    return new Response(imageBuffer, {
      headers: { "Content-Type": "image/png" },
    });

  } catch (e) {
    return new Response(`发生错误: ${e.message}`, { status: 500 });
  }
}
