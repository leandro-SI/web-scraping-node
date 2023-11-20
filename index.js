const express = require('express');
const server = express();
const axios = require('axios');
const cheerio = require('cheerio');
const Character = require('./models/Character');
const CharacterServidor = require('./models/CharacterServidor');

var url = "";

const urlUnited = "https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=United&action=characters";
const urlObscubraPune = "https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=Obscubra+Pune";
const urlServidor = "https://www.tibia.com/community/?subtopic=worlds&world=Obscubra";

url = urlObscubraPune;

var collection = [];
var collectionServidor = [];

getCharactersGuild();
getCharactersServidor();

server.get('/hunteds', (req, res) => {
    console.log(req)
    return res.json(collectionServidor)
});

server.listen(3000, () => {
    console.log('Servidor está funcionando...')
});


async function getCharactersGuild() {

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

    collection = collection.filter(c => c.status == 'online')

}

async function getCharactersServidor() {

    const { data } = await axios.get(urlServidor);
    const $ = cheerio.load(data);

    var count = 0;

    $('.Table2 tbody tr td div table tbody tr').slice(1).each((i, elem) => {

        var character = new Object();

        character.nome = $(elem).find('td:eq(0)').text();
        character.level = $(elem).find('td:eq(1)').text();
        character.profissao = $(elem).find('td:eq(2)').text();

        let aux = collection.filter(c => c.nome == character.nome);

        if (aux.length == 0) {
            collectionServidor.push(character);

            count += 1;
        }

    });

}
