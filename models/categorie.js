import { Schema, model } from "mongoose"

const AdminCategories = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    adminId: {
        type:Schema.Types.ObjectId,
        ref:'admin'
    }
})
export default model("AdminCategories", AdminCategories);