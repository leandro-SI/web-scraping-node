const express = require('express');
const server = express();
const axios = require('axios');
const cheerio = require('cheerio');
const Character = require('./models/Character')

const url = "https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=United&action=characters";

var collection = [];
getCharacters();

server.get('/chares', (req, res) => {
    console.log(req)
    return res.json(collection)
});

server.listen(3000, () => {
    console.log('Servidor está funcionando...')
});


async function getCharacters() {

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // var title = $('#Boss').attr('src');
    // console.log(title);

    var count = 0;

    $('.TableContent tbody tr').each((i, elem) => {
        const name = $(elem).text();

        var objeto = name.split('\n');

        if (count > 0) {
            if (objeto[1] === undefined) {
                return false;
            }
        }

        var character = new Object();

        character.nome = objeto[1];
        character.profissao = objeto[2];
        character.level = objeto[3];
        character.data = objeto[4];
        character.status = objeto[5]

        collection.push(character);

        count += 1;

    });

}
