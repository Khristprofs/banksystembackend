const UserProfile = require("../model/Profile");

exports.createProfile = (data) => {
  return UserProfile.create(data);
};

exports.getProfiles = () => {
  return UserProfile.find().populate("userId");
};

exports.getProfileById = (id) => {
  return UserProfile.findById(id).populate("userId");
};

exports.getProfileByUserId = (userId) => {
  return UserProfile.findOne({ userId }).populate("userId");
};

exports.getProfileByFullName = (firstName, lastName, middleName) => {

  const query = {
    firstName: new RegExp(`^${firstName}$`, "i"),
    lastName: new RegExp(`^${lastName}$`, "i"),
  };

  if (middleName) {
    query.middleName = new RegExp(`^${middleName}$`, "i");
  }

  return UserProfile.find(query);
};

exports.updateProfile = (id, data) => {
  return UserProfile.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteProfile = (id) => {
  return UserProfile.findByIdAndDelete(id);
};