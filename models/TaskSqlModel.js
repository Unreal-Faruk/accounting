const db = require('../db'); // Assuming you have a db.js for database connection

class Task {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.subject = data.subject;
        this.description = data.description;
        this.clientFirstName = data.clientFirstName;
        this.clientLastName = data.clientLastName;
        this.clientEmail = data.clientEmail;
        this.clientAddress = data.clientAddress;
        this.createdTime = data.createdTime;
        this.updatedTime = data.updatedTime;
        this.hourRate = data.hourRate;
        this.isArchived = data.isArchived;
        this.userId = data.userId;
    }


    static async getAllWithActivitiesAndPrices(userId) {
        try {
            const query = `
                SELECT
                    t.*,
                    a.date AS activityDate,
                    a.description AS activityDescription,
                    a.minutes AS activityMinutes,
                    p.description AS priceDescription,
                    p.price AS priceAmount
                FROM task t
                LEFT JOIN activity a ON t.id = a.taskId
                LEFT JOIN price p ON t.id = p.taskId
                WHERE t.userId = ?
                ORDER BY t.id, a.date, p.id`;

            const [rows] = await db.promise().query(query, [userId]);

            const tasks = {};
            rows.forEach(row => {
                if (!tasks[row.id]) {
                    tasks[row.id] = new Task(row);
                    tasks[row.id].activities = [];
                    tasks[row.id].prices = [];
                }
                if (row.activityDate) {
                    tasks[row.id].activities.push({
                        date: row.activityDate,
                        description: row.activityDescription,
                        minutes: row.activityMinutes
                    });
                }
                if (row.priceDescription) {
                    tasks[row.id].prices.push({
                        description: row.priceDescription,
                        price: row.priceAmount
                    });
                }
            });

            return Object.values(tasks);
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM task WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new Task(rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async create(newTask) {
        try {
            const [result] = await db.promise().query('INSERT INTO task SET ?', newTask);
            const createdTaskId = result.insertId;
            return createdTaskId;
        } catch (error) {
            throw error;
        }
    }


    // Update Task along with activities and prices if provided
    static async update(id, updatedTask) {
        try {
            const { activities, prices, ...taskDetails } = updatedTask;

            // Update the main task details
            await db.promise().query('UPDATE task SET ? WHERE id = ?', [taskDetails, id]);

            // Update activities and prices if they're provided
            if (activities) {
                for (const activity of activities) {
                    if (activity.id) {
                        // If activity has an ID, update existing activity
                        await db.promise().query('UPDATE activity SET ? WHERE id = ?', [activity, activity.id]);
                    } else {
                        // If activity doesn't have an ID, create a new activity linked to the task
                        await db.promise().query('INSERT INTO activity SET ?', {
                            ...activity,
                            taskId: id
                        });
                    }
                }
            }

            if (prices) {
                for (const price of prices) {
                    if (price.id) {
                        // If price has an ID, update existing price
                        await db.promise().query('UPDATE price SET ? WHERE id = ?', [price, price.id]);
                    } else {
                        // If price doesn't have an ID, create a new price linked to the task
                        await db.promise().query('INSERT INTO price SET ?', {
                            ...price,
                            taskId: id
                        });
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }


    static async delete(id) {
        try {
            await db.promise().query('DELETE FROM task WHERE id = ?', [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Task;
