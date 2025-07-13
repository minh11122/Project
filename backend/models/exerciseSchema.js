const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String, 
    required: true
  },
  equipment: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: Number // đơn vị: phút
  },
  huongDan: {
    type: String,
    default: ''
  },

  // ✅ Thêm thuộc tính mới
  set: {
    type: Number,
    default: 3, // ví dụ mặc định là 3 hiệp
  },
  rep: {
    type: Number,
    default: 12 // ví dụ mặc định là 12 lần mỗi hiệp
  }

}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
