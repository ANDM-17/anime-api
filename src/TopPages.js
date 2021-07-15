const {Top} = require("./functions/Top");
const Discord = require("discord.js");
let Type = ["message", "embed"];
require("discord-reply");
const disbut = require("discord-buttons");
let buttonsData = [];
class TopPages {
  constructor(settings) {
    if (!settings.Client)
      throw new Error("[anime-api] - Error : The Client is Not Exist");
    if (!settings.messageType) settings.messageType = "embed";
    if (!Type.includes(settings.messageType.toLowerCase()))
      settings.messageType = "embed";
    if (!settings.color) settings.color = "black";
    if (!settings.Content) settings.Content = "Top 10 Animes \n [top]";
    if (!settings.ReplyMessage) settings.ReplyMessage = false;
    if (!settings.TopAnimes) settings.TopAnimes = 10;
    if (typeof settings.TopAnimes != "number")
      throw new SyntaxError("[anime-api] - Error : TopAnimes Must Be A Number");
    if (!settings.Pages) settings.Pages = 1;
    if (typeof settings.Pages != "number")
      throw new SyntaxError("[anime-api] - Error : Pages Must Be A Number");
    if (!settings.ErrorMessage)
      settings.ErrorMessage = " This Page Is Not Found 🙂";
      if(!settings.buttonsTimeout) settings.buttonsTimeout = 100000;
    if(typeof settings.buttonsTimeout != "number") throw new SyntaxError("[anime-api] - Error : buttonsTimeout Must Be A Number");
    this.buttonsTimeout = settings.buttonsTimeout;
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
    if (this.TopAnimes < 5)
      throw new SyntaxError("[anime-api] - Error : TopAnimes Is less than 5");
    if (this.TopAnimes >= 51)
      throw new SyntaxError(
        "[anime-api] - Error : You Reached The Maximum TopAnimes Maximum is 50"
      );
    let Arrays = await Top(TopAnime);
    let Strings = "";
    let NowPage = 0;
    let MaxPages = await Much(TopAnime + 1);
    for (let i = 0; i < Arrays.length; i++) {
      if (Pages == 3) {
        if (i > 19) {
          if (i < 30) {
            Strings += Arrays[i] + "\n";
          }
          NowPage = 3;
        }
      }
      if (Pages == 4) {
        if (i > 29) {
          if (i < 40) {
            Strings += Arrays[i] + "\n";
          }
        }
        NowPage = 4;
      }
      if (Pages == 5) {
        if (i > 39) {
          if (i < 50) {
            Strings += Arrays[i] + "\n";
          }
        }
        NowPage = 5;
      }
      if (Pages == 2) {
        if (i > 9) {
          if (i < 20) {
            Strings += Arrays[i] + "\n";
          }
          NowPage = 2;
        }
      }
      if (Pages == 1) {
        if (i < 10) {
          Strings += Arrays[i] + "\n";
        }
        NowPage = 1;
      }
    }
    let topContent = Content.replace(
      "[top]",
      Strings || "\n" + "" + this.ErrorMessage + ""
    );
    if (String(topContent).includes(String(this.ErrorMessage))) {
      NowPage = 0;
    }
    if (messageType == "embed") {
      let embed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setDescription(topContent);
      if (NowPage == 0) {
        embed.setFooter("Pages " + "??" + "/" + MaxPages + "");
      } else {
        embed.setFooter("Pages " + NowPage + "/" + MaxPages + "");
      }
      if (replyMessage) {
        return Message.lineReplyNoMention(embed);
      } else {
        return Message.channel.send(embed);
      }
    }
    if (messageType == "message") {
      if (!replyMessage) {
        if (NowPage == 0) {
          return Message.channel.send(
            topContent + "Pages " + "??" + "/" + MaxPages + ""
          );
        } else {
          return Message.channel.send(
            topContent + "Pages " + NowPage + "/" + MaxPages + ""
          );
        }
      } else {
        if (NowPage == 0) {
          return Message.lineReplyNoMention(
            topContent + "Pages " + "??" + "/" + MaxPages + ""
          );
        } else {
          return Message.lineReplyNoMention(
            topContent + "Pages " + NowPage + "/" + MaxPages + ""
          );
        }
      }
    }
  }
  async ButtonsPages(client, Message, leftButton, rightButton) {
    if (this.TopAnimes < 5)
    throw new SyntaxError("[anime-api] - Error : TopAnimes Is less than 5");
  if (this.TopAnimes >= 51)
    throw new SyntaxError(
      "[anime-api] - Error : You Reached The Maximum TopAnimes Maximum is 50"
    );
    let NowPage = this.Pages;
    let top = await getTop(this.Pages , this.TopAnimes - 1);
    let embedColor = this.color;
    let Content = this.Content;
    let Random1 = Math.floor(Math.random() * 99999312) + 231232;
    let Random2 = Math.floor(Math.random() * 99999312) + 231232;
    this.button1 = String(Random1);
    this.button2 = String(Random2);
    buttonsData.push("top" + this.button1);
    buttonsData.push("top" + this.button2);
    let MaxPages = await Much(this.TopAnimes);
    let topContent = Content.replace(
      "[top]",
      top || "\n" + "" + this.ErrorMessage + ""
    );
    let embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(topContent)
      .setFooter("Pages " + NowPage + "/" + MaxPages + "");
    let button = new disbut.MessageButton()
      .setLabel(leftButton || "<")
      .setID("top" + this.button1)
      .setStyle("grey");
    let button2 = new disbut.MessageButton()
      .setLabel(rightButton || ">")
      .setID("top" + this.button2)
      .setStyle("grey");
    let row = new disbut.MessageActionRow().addComponents(button, button2);
    // if (this.ReplyMessage) {
    //   this.embedMessage = await Message.lineReplyNoMention({
    //     embed: embed,
    //     buttons: [button],
    //   });
  //  } else {
      this.embedMessage = await Message.channel.send(embed, row);
  //  }
    this.timenow = Date.now();
    client.on("clickButton", async (button) => {
      try {
        if (Message.author.id != button.clicker.user.id) return;
        if(this.buttonsTimeout - (Date.now() - this.timenow) > 0){
        if (button.id == "top" + this.button2) {
          await button.reply.defer().catch((err) => {
            throw err;
          });
          if (NowPage >= MaxPages) return;
          NowPage++;
          let tops = await getTop(NowPage , this.TopAnimes - 1);
          let topContentt = Content.replace(
            "[top]",
            tops || "\n" + "" + this.ErrorMessage + ""
          );
          let embedCol = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(topContentt)
            .setFooter("Pages " + NowPage + "/" + MaxPages + "");
          let buttonCol = new disbut.MessageButton()
            .setLabel(leftButton || "<")
            .setID("top" + this.button1)
            .setStyle("grey");
          let buttonCol2 = new disbut.MessageButton()
            .setLabel(rightButton || ">")
            .setID("top" + this.button2)
            .setStyle("grey");
          if (NowPage >= 5) {
            await buttonCol2.setDisabled();
          }
          let rows = new disbut.MessageActionRow().addComponents(
            buttonCol,
            buttonCol2
          );
          let Msgg = await Message.channel.messages
            .fetch(this.embedMessage.id)
            .catch((err) => {
              throw err;
            });
          if (Msgg) {
            await Msgg.edit(embedCol, rows);
          }
        } else if (button.id == "top" + this.button1) {
          await button.reply.defer().catch((err) => {
            throw err;
          });
          if (NowPage <= 1) return;
          NowPage -= 1;
          let tops = await getTop(NowPage , this.TopAnimes);
          let topContentt = Content.replace(
            "[top]",
            tops || "\n" + "" + this.ErrorMessage + ""
          );
          let embedCol = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(topContentt)
            .setFooter("Pages " + NowPage + "/" + MaxPages + "");
          let buttonCol = new disbut.MessageButton()
            .setLabel(leftButton || "<")
            .setID("top" + this.button1)
            .setStyle("grey");
          let buttonCol2 = new disbut.MessageButton()
            .setLabel(rightButton || ">")
            .setID("top" + this.button2)
            .setStyle("grey");
          if (NowPage <= 1) {
            await buttonCol.setDisabled();
          }
          let rows = new disbut.MessageActionRow().addComponents(
            buttonCol,
            buttonCol2
          );
          let Msgg = await Message.channel.messages
            .fetch(this.embedMessage.id)
            .catch((err) => {
              throw err;
            });
          if (Msgg) {
            await Msgg.edit(embedCol, rows);
          }
        }
      }
      } catch (err) {
        throw err;
      }
    });
  }
}
async function getTop(pageNow , TopAnimes) {
  let Arrays = await Top(TopAnimes);
  let Strings = "";
  let Pages = pageNow;
  let NowPage = 0;
  for (let i = 0; i < Arrays.length; i++) {
    if (Pages == 3) {
      if (i > 19) {
        if (i < 30) {
          Strings += Arrays[i] + "\n";
        }
        NowPage = 3;
      }
    }
    if (Pages == 4) {
      if (i > 29) {
        if (i < 40) {
          Strings += Arrays[i] + "\n";
        }
      }
      NowPage = 4;
    }
    if (Pages == 5) {
      if (i > 39) {
        if (i < 50) {
          Strings += Arrays[i] + "\n";
        }
      }
      NowPage = 5;
    }
    if (Pages == 2) {
      if (i > 9) {
        if (i < 20) {
          Strings += Arrays[i] + "\n";
        }
        NowPage = 2;
      }
    }
    if (Pages == 1) {
      if (i < 10) {
        Strings += Arrays[i] + "\n";
      }
      NowPage = 1;
    }
  }
  return Strings;
}
async function Much(Animes) {
  let Total = 0;
  if (Animes > 0) {
    Total += 1;
  }
  if (Animes > 10) {
    Total += 1;
  }
  if (Animes > 20) {
    Total += 1;
  }
  if (Animes > 30) {
    Total += 1;
  }
  if (Animes > 40) {
    Total += 1;
  }

  return Total;
}
module.exports = TopPages;
