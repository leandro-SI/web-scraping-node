const { getHunteds } = require("../services/huntedsService")


const getAllHunteds = async (request, response) => {

    const hunteds = await getHunteds();

    let dataResponse = {
        data: hunteds,
        total: hunteds.length,
    }

    return response.status(200).json(dataResponse);
}

module.exports = {
    getAllHunteds
}