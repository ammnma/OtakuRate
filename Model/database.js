
require('dotenv').config();
const mongoose = require('mongoose');

const database = {
   connect: async function() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ Database connection opened at: ' + process.env.MONGODB_URI);
            return true; 
        } catch (err) {
            console.error("❌ DB Connection Error:", err);
            throw err; 
        }
    },

    insertOne: async function(model, doc) {
        return await model.create(doc);
    },

    insertMany: async function(model, docs) {
        return await model.insertMany(docs);
    },

    findOne: async function(model, query, projection) {
        return await model.findOne(query, projection);
    },

    findMany: async function(model, query, projection) {
        return await model.find(query, projection);
    },

    updateOne: async function(model, filter, update) {
        return await model.updateOne(filter, update);
    },

    updateMany: async function(model, filter, update) {
        return await model.updateMany(filter, update);
    },

    deleteOne: async function(model, conditions) {
        return await model.deleteOne(conditions);
    },

    deleteMany: async function(model, conditions) {
        return await model.deleteMany(conditions);
    }
}

module.exports = database;