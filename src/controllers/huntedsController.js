const { getHunteds } = require("../services/huntedsService")


const getAllHunteds = async (request, response) => {

    let premium = request.query.premium;

    let hunteds = await getHunteds(premium);

    let dataResponse = {
        data: hunteds,
        total: hunteds.length,
    }

    return response.status(200).json(dataResponse);
}

module.exports = {
    getAllHunteds
}