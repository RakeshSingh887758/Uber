const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        exprires: 86400
    }
}
)

module.exports=mongoose.model('BlacklistToken',blacklistTokenSchema)