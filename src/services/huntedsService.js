const axios = require('axios');
const cheerio = require('cheerio');
const Configuracoes = require("../configs/Configuracoes");
const Utils = require('../utils/Utils')
const CharacterServidor = require('../models/CharacterServidor')



const getAll = async () => {

    let allList = [];

    const { data } = await axios.get(Configuracoes.urlObscubraPune);
    const $ = cheerio.load(data);

    let count = 0;

    $('.TableContent tbody tr').each((i, elem) => {
        const name = $(elem).text();

        let objeto = name.split('\n');

        if (count > 0) {
            if (objeto[1] === undefined) {
                return false;
            }
        }

        let character = new Object();

        character.nome = objeto[1];
        character.profissao = objeto[2];
        character.level = objeto[3];
        character.data = objeto[4];
        character.status = objeto[5]

        allList.push(character);

        count += 1;

    });

    return allList;
}

const getHunteds = async (premium) => {

    let todos = await getAll();
    let huntedsList = [];

    const { data } = await axios.get(Configuracoes.urlObscubra);
    const $ = cheerio.load(data);

    $('.Table2 tbody tr td div table tbody tr').slice(1).each((i, elem) => {

        let character = new Object();

        character.nome = $(elem).find('td:eq(0)').text();
        character.level = $(elem).find('td:eq(1)').text();
        character.profissao = $(elem).find('td:eq(2)').text();

        let filtro = todos.filter(c => c.nome == character.nome);

        if (filtro.length == 0) {
            huntedsList.push(character);
        }

    });
   
    let vocacoes = ['Master', 'Royal', 'Elite', 'Elder'];

    if (premium == 1) {
        huntedsList = await huntedsList.filter(h => 
            h.profissao.includes(vocacoes[0]) ||
            h.profissao.includes(vocacoes[1]) ||
            h.profissao.includes(vocacoes[2]) ||
            h.profissao.includes(vocacoes[3]));
    }

    return huntedsList.sort(Utils.OrdenarHunteds);
}

module.exports = {
    getAll,
    getHunteds
}