const { response } = require('express')
const { client } = require('./connection')



const createTask = (req, res) => {
    const {  title, description, dateadded, duedate, iscompleted, isimportant, userid } = req.body
    const insertTask = 'insert into usertasks ( title, description, dateadded, duedate ,iscompleted,isimportant,userid) values ($1, $2, $3, $4, $5,$6,$7)';
    console.log(insertTask);
    client.query(insertTask, [ title, description, dateadded, duedate, iscompleted, isimportant, userid], (err, response) => {
        if (!err) {

            console.log("data inserted successfully");
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "Success" });
        }
        else {
            console.log(err);
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "Failure" });
        }
        client.end;
    })
}

const deleteTask = (req, res) => {
    const { taskid, userid } = req.query
    // DELETE FROM table_name
    // WHERE[condition];
    // console.log(req);
    const deleteTask = 'delete from usertasks where taskid = $1 and userid = $2';
    console.log(deleteTask);
    client.query(deleteTask, [taskid, userid], (err, response) => {
        if (!err) {
            // console.log('data is there...');
            // response.status(201).send()
            console.log("task data deleted successfully");
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "success" });
        }
        else {
            console.log(err);
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "error" });
        }
        client.end;
    })
}

const editTask = (req, res) => {
    const { taskid, title, description, dateadded, duedate, isCompleted, isImportant, userid  } = req.body
    
    const editTask = 'insert into usertasks (taskid, title, description, dateadded, duedate ,iscompleted,isimportant,userid) values ($1, $2, $3, $4, $5,$6,$7,$8) on conflict (taskid) do update set title = excluded.title , description = excluded.description , duedate = excluded.duedate , iscompleted = excluded.iscompleted , isimportant = excluded.isimportant';
    client.query(editTask, [taskid, title, description, dateadded, duedate, isCompleted, isImportant, userid ], (err, response) => {
        if (!err) {
            // console.log('data is there...');
            // response.status(201).send()
            // console.log();
            console.log("task data edited successfully");
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "Success" });
        }
        else {
            console.log(err);
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "Success" });
        }
        client.end;
    })
}

const getTasks = (req, res) => {
    let { userid  } = req.query
    console.log('====================================');
    console.log(req.query);
    console.log('====================================');
    // DELETE FROM table_name
    // WHERE[condition];
    userid=Number(userid)
    console.log('====================================');
    console.log(typeof userid);
    console.log('====================================');
    const getTaskQuery = 'select * from usertasks where userid = $1'
    console.log(getTaskQuery);
    client.query(getTaskQuery, [userid ], (err, response) => {
        if (!err) {
            // console.log('data is there...');
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({data: response.rows});
        }
        else {
            console.log(err);
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ data: [] });
        }
        client.end;
    })
}

module.exports = {
    createTask,
    deleteTask,
    editTask,
    getTasks
}