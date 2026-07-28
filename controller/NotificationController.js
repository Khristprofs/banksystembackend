const notificationService = require("../services/notificationService");
const response = require("../helpers/responseHelper");

class NotificationController {

    async getAllNotifications(req, res) {
        try {

            const notifications = await notificationService.getAllNotifications(req.query);

            return response.success(
                res,
                notifications,
                "Notifications retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    async getNotificationById(req, res) {
        try {

            const notification = await notificationService.getNotificationById(
                    req.params.id
                );

            return response.success(
                res,
                notification,
                "Notification retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 404
            );

        }
    }

    async getNotificationsByUser(req, res) {
        try {

            const notifications = await notificationService.getNotificationsByUser(
                    req.params.userId
                );

            return response.success(
                res,
                notifications,
                "User notifications retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    async getUnreadNotifications(req, res) {
        try {

            const notifications =
                await notificationService.getUnreadNotifications(
                    req.params.userId
                );

            return response.success(
                res,
                notifications,
                "Unread notifications retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    async getArchivedNotifications(req, res) {
        try {

            const notifications = await notificationService.getArchivedNotifications(
                    req.params.userId
                );

            return response.success(
                res,
                notifications,
                "Archived notifications retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    async markAsRead(req, res) {
        try {

            const notification = await notificationService.markAsRead(
                    req.params.id
                );

            return response.success(
                res,
                notification,
                "Notification marked as read."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    async markAllAsRead(req, res) {
        try {

            const notifications =
                await notificationService.markAllAsRead(
                    req.params.userId
                );

            return response.success(
                res,
                notifications,
                "All notifications marked as read."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    async archiveNotification(req, res) {
        try {

            const notification =
                await notificationService.archiveNotification(
                    req.params.id
                );

            return response.success(
                res,
                notification,
                "Notification archived successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    async archiveAllNotifications(req, res) {
        try {

            const notifications =
                await notificationService.archiveAllNotifications(
                    req.params.userId
                );

            return response.success(
                res,
                notifications,
                "All notifications archived successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    /**
     * ==========================================================
     * Update Notification
     * ==========================================================
     */
    async updateNotification(req, res) {
        try {

            const notification =
                await notificationService.updateNotification(
                    req.params.id,
                    req.body
                );

            return response.success(
                res,
                notification,
                "Notification updated successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    /**
     * ==========================================================
     * Delete Notification
     * ==========================================================
     */
    async deleteNotification(req, res) {
        try {

            const notification =
                await notificationService.deleteNotification(
                    req.params.id
                );

            return response.success(
                res,
                notification,
                "Notification deleted successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 404
            );

        }
    }

}

module.exports = new NotificationController();