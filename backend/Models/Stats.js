import mongoose from "mongoose";


const StatsModel = new mongoose.Schema({
    users:{
        type: Number,
        default: 0,
    },

    subscription:{
        type: Number,
        default: 0,
    },

    views:{
        ttype: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

    

});



export const Stats = mongoose.model('Stats', StatsModel);