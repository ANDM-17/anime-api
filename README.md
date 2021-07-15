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

## Pages Setup :
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

## Top With Discord Button Setup :

```js
const Anime = require("anime-api");
const Discord = require("discord.js");
const client = new Discord.Client();
const disbut = require('discord-buttons');
disbut(client);


client.on("message", async function(message){
    if(message.content.startsWith("topButtons")){ //
        let args = message.content.split(" ")
        let TopAnime = new Anime.TopPages({
              Client : client,// Discord Client // Required
              color : "#3e6deb", // Color default black //Not Required
              TopAnimes: 50,// Top 10 Anime limit is 50 //Not Required
              Content : "Top 50 \n[top]",// default Top 10 Animes \n [top] //Not Required
              buttonsTimeout : 100000,//buttons Timeout  default is 100000ms//Not Required
              Pages : Number(args[1]),// Page Number every 10 Animes +1 one Page //Not Required
            })
        return TopAnime.ButtonsPages(client , message , '<' , ">").catch(err => {throw err});
    }
});
```

## Examples 

Top with Moved Buttons : 
<div align="center">
  <img src="https://cdn.discordapp.com/attachments/864207573463597108/864582522243252224/unknown.png">
  <br> <br>
</div>

```js
const disbut = require('discord-buttons');
disbut(client);

client.on("message", async function(message){
    if(message.content.startsWith("topButtons")){ //
        let args = message.content.split(" ")
        let TopAnime = new Anime.TopPages({
              Client : client,
              color : "#3e6deb", 
              TopAnimes: 50,
              buttonsTimeout : 100000,
              Pages : Number(args[1]),
            })
        return TopAnime.ButtonsPages(client , message , '<' , ">").catch(err => {throw err});
    }
});
```

## Data Top Animes :

<div align="center">
<img src="https://cdn.discordapp.com/attachments/864207573463597108/864787097105727488/unknown.png">
 <br> <br>
</div>

```js
const Anime = require("anime-api");


async function Data() {
    let data = await Anime.TopData(10)// The number required to collect ِTop Anime //The maximum is 50;
    console.log(data)
}

Data()
```

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
## Random Anime Gifs  Form tenor.com

<div align="center">
  <img src="https://cdn.discordapp.com/attachments/863796420996890645/865267322649444372/unknown.png">
  <br> <br>
</div>

```js

/// Random Sad Anime Gifs Form tenor.com
const Anime = require("anime-api");
const RandomGifs =  new Anime.Random();

client.on("message", async (message) => {
    if(message.content.startsWith("random")){ 
     let random = await RandomGifs.randomSadGif();
        message.channel.send(random)
    }
})
```

<div align="center">
  <img src="https://cdn.discordapp.com/attachments/863796420996890645/865266835750780938/unknown.png">
  <br> <br>
</div>

```js
/// Find Anime Random Gifs Form tenor.com
const Anime = require("anime-api");
const RandomGifs =  new Anime.Random();

client.on("message", async(message) => {
    if(message.content.startsWith("random")){ 
     let args = message.content.split(" ").slice(1).join(" ")
     let random = await RandomGifs.findRandomGif(args);
     if(random){
        message.channel.send(random)
     } else {
         message.channel.send("Not Found")
     }
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
