/* eslint-disable no-console */
require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const dayjs = require('dayjs')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    }
    console.log('Connected to database with id: ' + connection.threadId)
})

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to medicine management system' })
})

// all roles login
app.post('/login', (req, res) => {
    const { username, password, role_id } = req.body
    connection.query(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' AND role_id = '${role_id}'`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                res.send({
                    message: 'Login successful',
                    user: result[0],
                })
            } else {
                res.send({
                    message: 'Invalid username or password',
                })
            }
        }
    )
})

// user register
app.post('/register', (req, res) => {
    const {
        username,
        password,
        name,
        mobile,
        state,
        city,
        email,
        question_answer,
    } = req.body
    //    check if username already exists
    console.table(req.body)
    connection.query(
        `SELECT username FROM users WHERE (username = '${username}' AND role_id = '4')  OR (mobile = '+91${mobile}' AND role_id = 4)`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                res.send({
                    message: 'Username or Mobile No already exists',
                })
            } else {
                connection.query(
                    `INSERT INTO users (role_id , username, password, name , state , city , mobile , email , question_answer) VALUES ( 4, '${username}', '${password}', '${name}' , '${state}' , '${city}' , '+91${mobile}' , '${email}' , '${question_answer}')`,
                    (err) => {
                        if (err) {
                            console.log(err)
                        }
                        //    send back the user that was just created
                        connection.query(
                            `SELECT * FROM users WHERE username = '${username}'`,
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                }
                                res.send({
                                    message: 'Registration successful',
                                    user: result[0],
                                })
                            }
                        )
                    }
                )
            }
        }
    )
})

// user reset password
app.post('/forgot_password', (req, res) => {
    const { username, question_answer, password } = req.body
    connection.query(
        `SELECT * FROM users WHERE username = '${username}' AND question_answer = '${question_answer}'`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                connection.query(
                    `UPDATE users SET password = '${password}' WHERE username = '${username}'`,
                    (err) => {
                        if (err) {
                            console.log(err)
                        }
                        res.send({
                            message: 'Password reset successful',
                        })
                    }
                )
            } else {
                res.send({
                    message: 'Invalid username or question answer',
                })
            }
        }
    )
})

// admin - add ngo
app.post('/add_ngo', (req, res) => {
    const { name, city, state, mobile, email } = req.body

    // generate random username and password
    const username =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    const password = Math.random().toString(36).substring(2, 15)

    console.log(username, password)

    console.table(req.body)
    connection.query(
        `SELECT username FROM users WHERE  (mobile = '+91${mobile}' AND role_id = 3)`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                res.send({
                    message: 'Username or Mobile No already exists',
                })
            } else {
                connection.query(
                    `INSERT INTO users (role_id , username, password, name , city , state , mobile , email , is_firstime) VALUES ( 3, '${username}', '${password}', '${name}'
                    , '${city}' , '${state}' , '+91${mobile}' , '${email}' , true)`,
                    (err) => {
                        if (err) {
                            console.log(err)
                        }
                        //    send back the user that was just created
                        connection.query(
                            `SELECT * FROM users WHERE mobile = '+91${mobile}'`,
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                }
                                res.send({
                                    message: 'Added ngo successfully',
                                    user: result[0],
                                })
                            }
                        )
                    }
                )
            }
        }
    )
})

// admin - add medicine
app.post('/add_medicine', (req, res) => {
    const { medicine_name, price, mfg_date, exp_date, quantity } = req.body
    connection.query(
        `INSERT INTO medicines (name, price,mfg_date,exp_date,quantity) VALUES ('${medicine_name}', '${price}','${mfg_date}','${exp_date}','${quantity}')`,
        (err) => {
            if (err) {
                console.log(err)
            }
            res.send({
                message: 'Added medicine successfully',
            })
        }
    )
})

// adming get all data - user data, ngo data
app.get('/get_data', (req, res) => {
    connection.query(
        `SELECT id, username,name,email,city,state,mobile FROM users WHERE role_id = '3'`,
        (err, result1) => {
            if (err) {
                console.log(err)
            }
            connection.query(
                `SELECT id,username,name,email,city,state,mobile FROM users WHERE role_id = '4'`,
                (err, result2) => {
                    if (err) {
                        console.log(err)
                    }
                    connection.query(
                        `SELECT id,name,price,mfg_date,exp_date,quantity FROM medicines`,
                        (err, result3) => {
                            if (err) {
                                console.log(err)
                            }
                            res.send({
                                ngo: result1,
                                users: result2,
                                medicines: result3,
                            })
                        }
                    )
                }
            )
        }
    )
})

// ngo change password
app.post('/ngo_change_password', (req, res) => {
    const { username, password, current_password } = req.body
    connection.query(
        `SELECT * FROM users WHERE username = '${username}' AND password = '${current_password}' AND role_id = 3`,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length > 0) {
                connection.query(
                    `UPDATE users SET password = '${password}' , is_firstime = false WHERE username = '${username} '
                    `,
                    (err) => {
                        if (err) {
                            console.log(err)
                        }
                        // send back updated user
                        connection.query(
                            `SELECT * FROM users WHERE username = '${username}'`,
                            (err, result) => {
                                if (err) {
                                    console.log(err)
                                }
                                res.send({
                                    message: 'Password updated successfully',
                                    user: result[0],
                                })
                            }
                        )
                    }
                )
            } else {
                res.send({
                    message: 'Invalid current password',
                })
            }
        }
    )
})

// user - new order
app.post('/new_order', (req, res) => {
    const { userID, medID, quantity } = req.body
    // ther is enough medicine in stock
    // console.log(userID, medID, quantity)
    connection.query(
        `SELECT quantity FROM medicines WHERE id = '${medID}'`,
        (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            // console.log(result)
            if (result[0].quantity >= quantity) {
                // decrease medicine quantity and place order
                connection.query(
                    `UPDATE medicines SET quantity = quantity - '${quantity}' WHERE id = '${medID}'`,
                    (err) => {
                        if (err) {
                            console.log(err)
                            res.send({
                                message:
                                    'Error in placing order. Server issue ',
                            })
                        } else {
                            connection.query(
                                `INSERT INTO orders (userID, medID, medQuantity) VALUES ('${userID}', '${medID}', '${quantity}')`,
                                (err) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    res.send({
                                        message: 'Order placed successfully',
                                    })
                                }
                            )
                        }
                    }
                )
            } else {
                res.send({
                    message: 'Not enough medicine in stock',
                })
            }
        }
    )
})

// user - get all orders
app.get('/get_orders', (req, res) => {
    const { userID } = req.query
    connection.query(
        `SELECT medicines.name as medicineName, orders.id as orderID,medicines.id as medicineID,
        (medicines.price * orders.medQuantity) as medicinePrice,
        medicines.mfg_date as medicineMfg_Date, medicines.exp_date medicineExp_Date, orders.medQuantity as purchasedQuantity FROM medicines INNER JOIN orders ON medicines.id = orders.medID WHERE orders.userID = '${userID}'`,
        (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Error in getting orders',
                })
            } else {
                if (result.length > 0) {
                    res.send({
                        message: 'Orders found',
                        // map through the orders and add select fields to the result
                        orders: result.map((donation) => {
                            donation.select = ''
                            return donation
                        }),
                    })
                } else {
                    res.send({
                        message: 'No orders found',
                    })
                }
            }
        }
    )
})

// user - get all medicines
app.get('/get_medicines', (req, res) => {
    connection.query(`SELECT * FROM medicines`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({
            message: 'Medicines found',
            // map through the result and add action to each medicine
            medicines: result.map((medicine) => {
                medicine.action = ''
                return medicine
            }),
        })
    })
})

// user - donate medicine
app.post('/donate_medicine', (req, res) => {
    const { userID, donatedMedicinesOrderID, donatedMedicineIDS } = req.body
    donatedMedicinesOrderID.forEach((orderID) => {
        connection.query(
            // delete order from orders table where orderID = orderID and userID = userID
            `DELETE FROM orders WHERE id = '${orderID}' AND userID = '${userID}'`,
            (err) => {
                if (err) {
                    console.log(err)
                    res.send({
                        message: 'Error in donating medicine',
                    })
                    // stop further execution
                    return
                } else {
                    // console.log('deleted')
                }
            }
        )
    })
    const stringifiedDonatedMedicinesOrderID = JSON.stringify(
        donatedMedicinesOrderID
    )
    const stringifiedDonatedMedicineIDS = JSON.stringify(donatedMedicineIDS)
    connection.query(
        `INSERT INTO donations (userID ,medicineIDS, donatedMedicines	,status , dateOfDonation) VALUES (?,? , ? , ? , ?)`,
        [
            userID,
            stringifiedDonatedMedicineIDS,
            stringifiedDonatedMedicinesOrderID,
            'pending',
            dayjs().format('YYYY-MM-DD'),
        ],
        (err) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Error in donating medicine',
                })
                return
            } else {
                res.send({
                    message: 'Medicine donated successfully',
                })
                return
            }
        }
    )
})

// ngo - get all donations
app.get('/get_donations', (req, res) => {
    connection.query(
        `SELECT user.name as userName,user.email as userEmail,user.city as userCity,user.state as userState,user.mobile as userMobile,donation.id as donationID FROM users as user INNER JOIN donations as donation   ON user.id = donation.userID AND donation.status = 0
    `,
        (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Server error',
                })
                return
            }
            res.send({
                //  map through the result array and add actions to each object
                donations: result.map((donation) => {
                    donation.actions = ''
                    return donation
                }),
            })
        }
    )
})

// ngo - get all executives
app.get('/get_executives', (req, res) => {
    connection.query(`SELECT * FROM users WHERE role_id = 2`, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                message: 'Server error',
            })
            return
        }
        res.send({
            executives: result,
        })
    })
})

// ngo - assign executive to donation
app.post('/assign_executive', (req, res) => {
    const { donationID, executiveID, ngoID } = req.body
    console.log(donationID, executiveID, ngoID)
    connection.query(
        `UPDATE donations SET ngoID = ? , execID = ? , status= 1 WHERE id = ?`,
        [ngoID, executiveID, donationID],
        (err) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Error in assigning executive',
                })
                return
            } else {
                res.send({
                    message: 'Executive assigned successfully',
                })
                return
            }
        }
    )
})

// executive - get all donations assigned to him
app.get('/get_donations_assigned', (req, res) => {
    const { executiveID } = req.query
    connection.query(
        // get username,email,city,state,mobile from users where orderID = orderID and execID = executiveID
        `SELECT user.name as userName,user.email as userEmail,user.city as userCity,user.state as userState,user.mobile as userMobile,donation.id as donationID FROM users as user INNER JOIN donations as donation   ON user.id = donation.userID AND donation.execID = '${executiveID}' AND donation.status = 1`,
        (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Server error',
                })
                return
            }
            // map through the result array and add actions to each object
            res.send({
                donations: result.map((donation) => {
                    donation.action = ''
                    return donation
                }),
            })
        }
    )
})

app.post('/change_status', (req, res) => {
    const { donationID } = req.body
    connection.query(
        `UPDATE donations SET status = ? WHERE id = ?`,
        [2, donationID],
        (err) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Error in assigning executive',
                })
                return
            } else {
                res.send({
                    message: 'Changed status successfully',
                })
                return
            }
        }
    )
})

// admin - show report
// admin should get all of these between two dates
// Date of donation, Medicine, User id, User name, Ngo Id, Ngo name, Executive id, Executive name who collected the medicine should be displayed.

app.get('/show_report', (req, res) => {
    const { startDate, endDate } = req.query
    connection.query(
        `SELECT A.medicineIDS, a.userID , a.dateOfDonation,a.execID, a.ngoID,B.name as username, C.name as ExeName, D.name as ngoName FROM donations as A 
            INNER JOIN users as B on B.id = A.userID 
            INNER JOIN users as C on C.id = A.execID
            INNER JOIN users as D on D.id = A.ngoID
            WHERE dateOfDonation BETWEEN '${startDate}' AND '${endDate}' `,
        (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Server error',
                    error: err,
                })
                return
            }
            if (result.length === 0) {
                res.send({
                    message: 'No data found',
                })
                return
            }
            // map through the result and parse the medicineIDS to an array
            res.send({
                report: result.map((report) => {
                    report.medicineIDS = JSON.parse(report.medicineIDS)
                    return report
                }),
            })
        }
    )
})

// edit profile - user, ngo
app.post('/edit_profile', (req, res) => {
    const { userID, name, email, city, state, mobile } = req.body
    connection.query(
        `UPDATE users SET name = ? , email = ? , city = ? , state = ? , mobile = ? WHERE id = ?`,
        [name, email, city, state, mobile, userID],
        (err) => {
            if (err) {
                console.log(err)
                res.send({
                    message: 'Error in editing profile',
                })
                return
            } else {
                res.send({
                    message: 'Profile edited successfully',
                })
                return
            }
        }
    )
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})
