"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: '',
        required: true
    },
    content: {
        type: String,
        default: '',
        required: true
    },
    slug: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    image: {
        type: String,
        default: ''
    },
    __v: { type: Number, select: false }
}, { timestamps: true });
exports.default = mongoose_1.model('Post', PostSchema);
