const fetch = require("node-fetch");
const cheerio = require("cheerio");

async function find(name) {
  let enCode = encodeURIComponent(name);
  try{
    let dataName = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]="${enCode}"&page[offset]=0`,
      {
        headers: {
          "User-Agent": "anime-api",
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      }
    ).then((data) => data.json());
    let formatedName = await dataName.data[0].attributes.titles.en_jp;
  if (formatedName) {
    let anime = formatedName.split(" ").join("-");
    let url = "https://tenor.com/search/" + anime.toLowerCase();
    let fetchurl = await fetch(url, { core: "no-core" });
    let data = [];
    let formated = await fetchurl.text();
    let $ = await cheerio.load(formated);
    await $("div .GifList img").each((i, el) => {
      let Imgg = $(el).attr("src");
      if(Imgg.startsWith("https://media.tenor.com/images/")){
      data.push(Imgg);
    }
    });
    if(!data)return undefined;
    return data;
  } else {
    return undefined;
  }
} catch (err){
    return undefined;
}
}

module.exports = find;
