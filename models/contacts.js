const mongoose = require("mongoose");
// const { plugin } = require("mongoose");
// const { SoftDelete } = require("soft-delete-mongoose-plugin");

// // defind soft delete field name
// const IS_DELETED_FIELD = "isDeleted";
// const DELETED_AT_FIELD = "deletedAt";

// // use soft delete plugin
// plugin(
//   new SoftDelete({
//     isDeletedField: IS_DELETED_FIELD,
//     deletedAtField: DELETED_AT_FIELD,
//   }).getPlugin()
// );

const contactsSchema = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: String },
    subject: { type: String },
    message: { type: String },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", contactsSchema);
