const Top = require("./Top");
const Discord = require("discord.js");
let Type = ["message", "embed"];
require("discord-reply");
class TopPages {
  constructor(settings) {
    if (!settings.Client)
      throw new Error("Anime-api Error : The Client is Not Exist");
    if (!settings.messageType) settings.messageType = "embed";
    if (!Type.includes(settings.messageType.toLowerCase()))
      settings.messageType = "embed";
    if (!settings.color) settings.color = "black";
    if (!settings.Content)settings.Content = "Top 10 Animes \n [top]";
    if (!settings.ReplyMessage) settings.ReplyMessage = false;
    if (!settings.TopAnimes) settings.TopAnimes = 10;
    if (typeof settings.TopAnimes != "number")
      throw new SyntaxError("Anime-api Error : TopAnimes Must Be A Number");
    if (!settings.Pages) settings.Pages = 1;
    if (typeof settings.Pages != "number")
     throw new SyntaxError("Anime-api Error : Pages Must Be A Number");
    if(!settings.ErrorMessage) settings.ErrorMessage = " This Page Is Not Found 🙂";
    this.color = settings.color;
    this.ReplyMessage = settings.ReplyMessage;
    this.Content = settings.Content;
    this.messageType = settings.messageType.toLocaleLowerCase();
    this.TopAnimes = settings.TopAnimes;
    this.Pages = settings.Pages;
    this.ErrorMessage = settings.ErrorMessage;
  }
  async top(Message) {
    let embedColor = this.color;
    let Content = this.Content;
    let messageType = this.messageType.toLocaleLowerCase();
    let replyMessage = this.ReplyMessage;
    let TopAnime = this.TopAnimes - 1;
    let Pages = this.Pages;
    if (TopAnime <= 3)
      throw new SyntaxError("Anime-api Error : TopAnimes Is less than 3");
    if (TopAnime >= 51)
      throw new SyntaxError(
        "Anime-api Error : You Reached The Maximum TopAnimes Maximum is 50"
      );
    let Arrays = await Top(TopAnime);
    let Strings = "";
    let NowPage = 0;
    let MaxPages = await Much(TopAnime + 1);
    for (let i = 0; i < Arrays.length; i++) {
        if (Pages == 3) {
            if(i > 19){
                if(i < 30){
            Strings += Arrays[i]  + "\n"
                }
          NowPage = 3;
            }
        } 
         if (Pages == 4) {
            if(i > 29){
                if(i < 40){
          Strings += Arrays[i]  + "\n"
                }
            }
          NowPage = 4;
        } 
         if (Pages == 5) {
            if(i > 39){
                if(i < 50){
          Strings += Arrays[i] + "\n";
                }
            }
          NowPage = 5;
        } 
         if(Pages == 2) {
            if(i > 9){
                if(i < 20){
          Strings += Arrays[i] + "\n";
                }
          NowPage = 2;
            }
        }
         if(Pages == 1) {
             if(i < 10){
          Strings += Arrays[i] + "\n";
             }
          NowPage = 1;
            }
    }
    let topContent = Content.replace("[top]", Strings || "\n" + ""+this.ErrorMessage+"");

    if(String(topContent).includes(String(this.ErrorMessage))){
        NowPage = 0;
    }
    if (messageType == "embed") {
      let embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(topContent)
        if(NowPage == 0){
        embed.setFooter("Pages "+'??'+"/"+MaxPages+"");
        } else {
        embed.setFooter("Pages "+NowPage+"/"+MaxPages+"");
        }
      if (replyMessage) {
        return  Message.lineReplyNoMention(embed);
      } else {
        return  Message.channel.send(embed);
      }
    }
    if (messageType == "message") {
      if (!replyMessage) {
          if(NowPage == 0){
        return  Message.channel.send(topContent + "Pages "+'??'+"/"+MaxPages+"");
          } else {
        return  Message.channel.send(topContent + "Pages "+NowPage+"/"+MaxPages+"");
          }
    } else {
          if(NowPage == 0){
        return  Message.lineReplyNoMention(topContent  + "Pages "+'??'+"/"+MaxPages+"");
          } else {
        return  Message.lineReplyNoMention(topContent  + "Pages "+NowPage+"/"+MaxPages+"");
      }
    }
    }
  }
}
async function Much(Animes){
let totle = 0;
if(Animes > 0){
totle += 1;
}
if(Animes > 10){
totle += 1;
}
if(Animes > 20){
totle += 1;
}
if(Animes > 30){
totle += 1;
}
if(Animes > 40){
totle += 1;
}

return totle;
}
module.exports = TopPages;
