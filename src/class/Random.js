let  {sad} = require("../data/Sad");
let FindGif = require("../functions/findGif");

class Random{
    constructor(){}
    async randomSadGif(){
        return sad[Math.floor(Math.random() * sad.length)];
    }
    async findRandomGif(name){
        if(!name)throw new SyntaxError("[anime-api] - Error findRandomGif :  I Can't Find Noting ")
      let animeFindGif = await FindGif(name);
      if(animeFindGif){
       return animeFindGif[Math.floor(Math.random() * animeFindGif.length)];
      } else {
        return undefined;
      }
    }
}
module.exports = Random;