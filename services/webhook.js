const en = require("../helper/language/en.json"),
    _ = require("lodash");

const list = async ({
    start,
    end,
    filter
}) => {
    try {
        let data = _.sortBy(coworkers, ['id']);
        if (filter) {
            // filter name by regex
            data = _.filter(data, (coworker) => {
                return coworker.name.match(new RegExp(filter, 'i'));
            });
        }
        const totalLength = data.length;
        if (start && end) {
            data = data.slice(start, end);
        }
        return {
            data,
            totalLength
        };

    } catch (error) {
        throw new Error(error.message || en.emailOrPasswordIncorrect);
    }
};

const findById = async (id) => {
    try {
        const data = _.find(coworkers, {
            id
        });
        return _.pick(data, ['name', 'text', 'imagePortraitUrl']);
    } catch (error) {
        throw new Error(error.message || en.enterDataCorrectly);
    }
};

const editById = async (id, {
    name,
    city,
    text
}) => {
    try {
        const index = _.findIndex(coworkers, {
            id
        });
        if (index === -1) {
            throw new Error(en.userNotFound);
        }
        coworkers[index].name = name;
        coworkers[index].city = city;
        coworkers[index].text = text;
        return {};
    } catch (error) {
        throw new Error(error.message || en.enterDataCorrectly);
    }
};



module.exports = {
    list,
    findById,
    editById
};