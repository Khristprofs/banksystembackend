const express = require("express");

const router = express.Router();

const notificationController = require("../controller/NotificationController");

const validate = require("../middlewares/validate");

const {
    updateNotificationSchema,
} = require("../validators/notificationValidator");


router.get(
    "/",
    notificationController.getAllNotifications
);

router.get(
    "/user/:userId",
    notificationController.getNotificationsByUser
);

router.get(
    "/user/:userId/unread",
    notificationController.getUnreadNotifications
);

router.get(
    "/user/:userId/archived",
    notificationController.getArchivedNotifications
);

router.get(
    "/:id",
    notificationController.getNotificationById
);

router.patch(
    "/:id/read",
    notificationController.markAsRead
);

router.patch(
    "/user/:userId/read-all",
    notificationController.markAllAsRead
);


router.patch(
    "/:id/archive",
    notificationController.archiveNotification
);

router.patch(
    "/user/:userId/archive-all",
    notificationController.archiveAllNotifications
);

router.patch(
    "/:id",
    validate(updateNotificationSchema),
    notificationController.updateNotification
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    notificationController.deleteNotification
);

module.exports = router;