const mongoose = require('mongoose');

const schemaComment = new mongoose.Schema({
    prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    comm_name: String,
    comm_mail: String,
    comm_date: {
        type: Date,
        default: Date.now
    },
    comm_details: String
})



mongoose.model("Comment", schemaComment, "Comment")