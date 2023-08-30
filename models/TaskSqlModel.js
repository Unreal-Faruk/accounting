const db = require('../db'); // Assuming you have a db.js for database connection

class Task {
    constructor(data) {
        // Initialize the Task object with data
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

    // Get all tasks along with activities and prices for the given user

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

    // Get a task by its ID along with activities and prices
    static async getById(id) {
        try {
            const query = `
            SELECT
                t.*,
                a.id AS activityId,
                a.date AS activityDate,
                a.description AS activityDescription,
                a.minutes AS activityMinutes,
                p.id AS priceId,
                p.description AS priceDescription,
                p.price AS priceAmount,
                p.isPercentage AS isPercentage
            FROM task t
            LEFT JOIN activity a ON t.id = a.taskId
            LEFT JOIN price p ON t.id = p.taskId
            WHERE t.id = ?
            ORDER BY a.date, p.id`;

            const [rows] = await db.promise().query(query, [id]);

            if (rows.length === 0) {
                return null;
            }

            const taskData = rows[0];
            const task = new Task(taskData);
            task.activities = [];
            task.prices = [];

            rows.forEach(row => {
                if (row.activityId && !task.activities.some(activity => activity.activityId === row.activityId)) {
                    task.activities.push({
                        activityId: row.activityId,
                        date: row.activityDate,
                        description: row.activityDescription,
                        minutes: row.activityMinutes
                    });
                }
                if (row.priceId && !task.prices.some(price => price.priceId === row.priceId)) {
                    task.prices.push({
                        priceId: row.priceId,
                        description: row.priceDescription,
                        price: row.priceAmount,
                        isPercentage: row.isPercentage
                    });
                }
            });
            return task;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // Create a new task
    static async create(newTask) {
        try {
            const [result] = await db.promise().query('INSERT INTO task SET ?', newTask);
            const createdTaskId = result.insertId;
            return createdTaskId;
        } catch (error) {
            throw error;
        }
    }

    // Update a task along with its activities and prices if provided
    static async update(id, updatedTask) {
        try {
            const { activities, prices, ...taskDetails } = updatedTask;
            console.log("-------------")
            // console.log(taskDetails)
            // Update the main task details
            const result = await db.promise().query('UPDATE task SET ? WHERE id = ?', [taskDetails, id]);

            console.log(result)

            // Update activities if provided
            if (activities) {
                await this.updateActivities(id, activities);
            }

            // Update prices if provided
            if (prices) {
                await this.updatePrices(id, prices);
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    // Update the activities associated with a task
    static async updateActivities(taskId, activities) {
        for (const activity of activities) {
            if (activity.id) {
                await db.promise().query('UPDATE activity SET ? WHERE id = ?', [activity, activity.id]);
            } else {
                await db.promise().query('INSERT INTO activity SET ?', {
                    ...activity,
                    taskId
                });
            }
        }
    }

    // Update the prices associated with a task
    static async updatePrices(taskId, prices) {
        for (const price of prices) {
            if (price.id) {
                await db.promise().query('UPDATE price SET ? WHERE id = ?', [price, price.id]);
            } else {
                await db.promise().query('INSERT INTO price SET ?', {
                    ...price,
                    taskId
                });
            }
        }
    }

    // Delete a task by its ID
    static async delete(id) {
        try {
            await db.promise().query('DELETE FROM task WHERE id = ?', [id]);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}

module.exports = Task;
