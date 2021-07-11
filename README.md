<div align="center">
  <h1>anime-api</h1>
    <p>
    <a href="https://www.npmjs.com/package/anime-api"><img src="https://img.shields.io/npm/v/anime-api?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/anime-api"><img src="https://img.shields.io/npm/dt/anime-api?maxAge=3600" alt="npm downloads" /></a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/anime-api"><img src="https://nodei.co/npm/anime-api.png?downloads=true&stars=true" alt="npm banner"></a>
  </p>
</div>

## Installation

```npm
npm install anime-api
```

## Setup 
```js
const Anime = require("anime-api");
const Discord = require("discord.js");
const client = new Discord.Client();


let TopAnime =  new Anime.TopPages({
              messageType : "embed" ,// message or embed default embed //Not Required
              Content : "", // default Top 10 Animes \n [top] //Not Required
              Client : client ,// Discord Client // Required
              ReplyMessage : true, // Message Reply //Not Required
              color : "#3e6deb" , // Color default black //Not Required
              TopAnimes: 10, // Top 10 Anime limit is 50 //Not Required
              Pages : 1 , // Page Number every 10 Animes +1 one Page //Not Required
              ErrorMessage : "Not Found", // default This Page Is Not Found 🙂//Not Required
            });
```

## Examples 

<div align="center">
  <img src="https://cdn.discordapp.com/attachments/863796420996890645/863802146645868544/Screenshot_31.png">
  <br> <br>
</div>

```js
client.on("message", async function(message){
    if(message.content.startsWith("top")){ 
        let args = message.content.split(" ")
        let TopAnime = new Anime.TopPages({
              messageType : "embed" ,
              Client : client ,
              ReplyMessage : true, 
              color : "#3e6deb" , 
              TopAnimes: 23, 
              Pages : Number(args[1]),
            })
        return TopAnime.top(message);
    }
})
```

<div align="center">
  <img src="https://cdn.discordapp.com/attachments/863796420996890645/863802878220566538/unknown.png">
  <br> <br>
</div>

```js
client.on("message", async function(message){
    if(message.content.startsWith("top")){ //
        let args = message.content.split(" ")
        let TopAnime = new Anime.TopPages({
              messageType : "embed" ,
              Client : client ,
              ReplyMessage : false, 
              color : "#3e6deb" , 
              TopAnimes: 50, 
              Pages : Number(args[1]),
            })
        return TopAnime.top(message);
    }
})
```
