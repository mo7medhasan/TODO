const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    }
    ,
    completed:{
        type:Boolean,
        default:false
    },
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User' },
},  {
    timestamps: true
})

mongoose.exports =mongoose.model("task",taskSchema)