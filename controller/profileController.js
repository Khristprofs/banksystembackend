const profileService = require("../services/profileService");
const response = require("../helpers/responseHelper");

exports.createProfile = async (req, res) => {
    try {
        const profile = await profileService.createProfile(req.body);

        response.success(res, profile, "Profile created", 201);

    } catch (error) {

        response.error(res, error.message);

    }
};

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getProfiles();
        response.success(res, profiles);

    } catch (error) {

        response.error(res, error.message);

    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await profileService.getProfileById(req.params.id);

        if (!profile) {
            return response.error(res, "Profile not found", 404);
        }
        response.success(res, profile);

    } catch (error) {
        response.error(res, error.message);

    }
};

exports.getProfileByUserId = async (req, res) => {
    try {
        const profile = await profileService.getProfileByUserId(req.params.userId);
        if (!profile) {
            return response.error(res, "Profile not found", 404);
        }
        response.success(res, profile);

    } catch (error) {

        response.error(res, error.message);

    }
};

exports.getProfileByFullName = async (req, res) => {
    try {
        const { firstName, lastName, middleName } = req.query;

        const profiles = await profileService.getProfileByFullName(
            firstName,
            lastName,
            middleName
        );
        response.success(res, profiles);
    } catch (error) {

        response.error(res, error.message);

    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await profileService.updateProfile(
            req.params.id,
            req.body
        );

        if (!profile) {
            return response.error(res, "Profile not found", 404);
        }
        response.success(res, profile, "Profile updated");

    } catch (error) {

        response.error(res, error.message);

    }
};

exports.deleteProfile = async (req, res) => {
    try {

        const profile = await profileService.deleteProfile(req.params.id);

        if (!profile) {
            return response.error(res, "Profile not found", 404);
        }
        response.success(res, null, "Profile deleted");

    } catch (error) {

        response.error(res, error.message);

    }
};