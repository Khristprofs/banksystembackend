const profileRepository = require("../repository/profileRepository");
const User = require("../model/Users");
const { hashSensitive } = require("../utils/sensitiveHashUtils");

exports.createProfile = async (data) => {
  const user = await User.findById(data.userId);
  if (!user) {
    throw new Error("User does not exist");
  }
  const existingProfile = await profileRepository.getProfileByUserId(data.userId);

  if (existingProfile) {
    throw new Error("User already has a profile");
  }

  if (data.kyc?.bvn) {
    data.kyc.bvn = await hashSensitive(data.kyc.bvn);
  }

  if (data.kyc?.nin) {
    data.kyc.nin = await hashSensitive(data.kyc.nin);
  }

  return profileRepository.createProfile(data);
};

exports.getProfiles = async () => {
  return profileRepository.getProfiles();
};

exports.getProfileById = async (id) => {
  return profileRepository.getProfileById(id);
};

exports.getProfileByUserId = async (userId) => {
  return profileRepository.getProfileByUserId(userId);
};

exports.getProfileByFullName = async (firstName, lastName, middleName) => {
  return profileRepository.getProfileByFullName(firstName, lastName, middleName);
};

exports.updateProfile = async (id, data) => {

  if (data.kyc?.bvn) {
    data.kyc.bvn = await hashSensitive(data.kyc.bvn);
  }

  if (data.kyc?.nin) {
    data.kyc.nin = await hashSensitive(data.kyc.nin);
  }

  return profileRepository.updateProfile(id, data);
};

exports.deleteProfile = async (id) => {
  return profileRepository.deleteProfile(id);
};