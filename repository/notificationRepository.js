const Notification = require("../model/Notification");

class NotificationRepository {

    async create(data, session = null) {

        if (session) {

            const docs = await Notification.create(
                [data],
                { session }
            );

            return docs[0];

        }

        return Notification.create(data);

    }

    async createMany(data, session = null) {

        if (session) {

            return Notification.insertMany(
                data,
                { session }
            );

        }

        return Notification.insertMany(data);

    }

    async findAll() {

        return Notification.find()
            .populate("userId")
            .populate("transactionId")
            .populate("accountId")
            .sort({ createdAt: -1 });

    }

    async findById(id) {

        return Notification.findById(id)
            .populate("userId")
            .populate("transactionId")
            .populate("accountId");

    }

    async findByUserId(userId) {

        return Notification.find({
            userId
        }).sort({
            createdAt: -1
        });

    }

    async findUnread(userId) {

        return Notification.find({

            userId,

            isRead: false

        }).sort({

            createdAt: -1

        });

    }

    async findArchived(userId) {

        return Notification.find({

            userId,

            isArchived: true

        });

    }

    async update(id, data) {

        return Notification.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            }
        );

    }

    async markAsRead(id) {

        return Notification.findByIdAndUpdate(
            id,
            {
                isRead: true,
                readAt: new Date()
            },
            {
                new: true
            }
        );

    }

    async archive(id) {

        return Notification.findByIdAndUpdate(
            id,
            {
                isArchived: true,
                archivedAt: new Date()
            },
            {
                new: true
            }
        );

    }

    async delete(id) {

        return Notification.findByIdAndDelete(id);

    }

}

module.exports = new NotificationRepository();