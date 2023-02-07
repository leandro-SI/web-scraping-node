const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=United&action=characters";

// async function getInfos() {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     // var title = $('#Boss').attr('src');
//     // console.log(title);

//     var count = 0;
//     var character = new Object();

//     $('.TableContent tbody tr').each((i, elem) => {
//         const name = $(elem).text();

//         var objeto = name.split('\n');

//         if (count > 0) {
//             if (objeto[1] === undefined) {
//                 // console.log('undefined');
//                 // console.log('Count: ', count);
//                 return false;
//             }
//         }

//         if (objeto[1] == 'Leozin Avatar') {
//             //console.log(objeto);
//             return false;
//         }        

//         character.nome = objeto[1];
//         character.profissao = objeto[2];
//         character.level = objeto[3];
//         character.data = objeto[4];
//         character.status = objeto[5]

//         //console.log(character);

//         count += 1;

//     });

//     return character;
// }

async function getInfos() {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // var title = $('#Boss').attr('src');
    // console.log(title);

    var count = 0;
    var character = new Object();
    var collection = [];

    //var c = new Character();

    $('.TableContent tbody tr').each((i, elem) => {
        const name = $(elem).text();

        var objeto = name.split('\n');

        if (count > 0) {
            if (objeto[1] === undefined) {
                // console.log('undefined');
                // console.log('Count: ', count);
                return false;
            }
        }

        // if (objeto[1] == 'Leozin Avatar') {
        //     //console.log(objeto);
        //     return false;
        // }        

        character.nome = objeto[1];
        character.profissao = objeto[2];
        character.level = objeto[3];
        character.data = objeto[4];
        character.status = objeto[5]

        c = character;

        collection.push(character);

        //console.log(character);

        count += 1;

    });

    console.log(collection);

}

getInfos();

