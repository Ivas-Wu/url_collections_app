class BaseRepository {
    constructor(connection, model) {
        this.connection = connection;
        this.model = model;
    }

    async findOne(query) {
        return this.model.findOne(query);
    }

    async find(query) {
        return this.model.find(query);
    }

    async create(data) {
        const entity = new this.model(data);
        return entity.save();
    }

    async update(query, data) {
        return this.model.findOneAndUpdate(query, data, { new: true });
    }

    async delete(query) {
        return this.model.findOneAndDelete(query);
    }
}

module.exports = BaseRepository; 