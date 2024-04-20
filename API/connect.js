const sqlite3 = require('sqlite3').verbose();
let path = __dirname + "/resources/database.db";
const db = new sqlite3.Database(path);
const { uuid } = require('uuidv4');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, user TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
});

const getUserNameById =(userId)=>{
    return new Promise((resolve,reject)=>{
        let sql = `select UserName from users where UserID = "${userId}"`;
        db.get(sql, (err,row)=>{
            if (err) {
                reject(err);
            } else {
                resolve(row.UserName);
            }
        })
    })
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.all("select * from users;", (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        })

    })

}

const userLoginValidate =(userData)=>{
    let sql = `select * from users where UserName="${userData.userName}" and UserPassword="${userData.userPassword}"`;
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject({status:400,message:"Server error please try again"});
            } else {
                resolve(row?{status:200,message:"valid user",userId:row.UserId}:{status:201,message:"invalid user"});
            }
        })

    })
}


const postUser = (userModel) => {
    return new Promise(async (resolve, reject) => {
        console.log(userModel);
        if (await isExistUser(userModel.userName)) {
           return resolve({ status: 201, message: "duplicate user not allowed" })
        }
        let sql = `Insert into users(UserId,UserName,UserPassword,IsActive) values 
        ("${uuid()}","${userModel.userName}","${userModel.userPassword}","${userModel.isActive}") `;
        db.run(sql, async (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(await getUsers());
            }
        })

    })
}

const isExistUser = (userName = "", userId = "") => {
    let sql = `select * from users where `;
    if (!userId && !userName) {
        return false;
    } else if (userName && !userId) {
        sql = sql + `UserName = "${userName}"`;
    } else {
        sql = sql + `UserId = "${userId}"`;

    }

    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (err) {
                reject(false);
            } else {
                resolve(row?true:false);
            }
        })

    })
}
const updateUser = (userModel) => {
    return new Promise((resolve, reject) => {
        console.log(userModel);
        let sql = `Insert into users(UserId,UserName,UserPassword,IsActive) values 
        ("${uuid()}","${userModel.userName}","${userModel.userPassword}","${userModel.isActive}") `;
        db.run(sql, async (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(await getUsers());
            }
        })

    })
}
module.exports = { db,getUsers, postUser, updateUser,userLoginValidate,getUserNameById }