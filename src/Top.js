const fetch = require("node-fetch");
const cheerio = require('cheerio');
let URl = 'https://myanimelist.net/topanime.php';
const Discord = require("discord.js");

    async function Top(resultslimt){
        let fetched = await fetch(URl , {core : 'no-core'});
        let data = await fetched.text();
        let $ = await cheerio.load(data);
        let dataa = [];
       await $('.detail h3').each((i , el) => {
           if(i > resultslimt)return;
            const itt = $(el).text();
            dataa.push(itt + ` #${i + 1}`);
        })
        return dataa;
        }
        async function Data(resultslimt){
            let fetched = await fetch(URl , {core : 'no-core'});
            let data = await fetched.text();
            let $ = await cheerio.load(data);
            let dataa = [];
           await $('.detail h3').each((i , el) => {
               if(i > resultslimt)return;
                const itt = $(el).text();
                dataa.push(itt);
            })
            return dataa;
            }


module.exports = Data;
module.exports.Top = Top;
