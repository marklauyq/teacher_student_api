const validator = require('email-validator');

const dbStudents = require('../models/students');
const dbTeachers = require('../models/teachers');
const dbMap = require('../models/map_teacher_students');


const getTeacherId = function (email) {
    return new Promise(function (resolve, reject) {

        //first lets check for valid teacher email
        if (validator.validate(email)) {
            dbTeachers.getTeacherByEmail(email, (result, error) => {

                if (error) {
                    reject(error);
                    return;
                }

                console.log(result.length);
                //teacher does not exist insert new teacher
                if (result.length === 0) {
                    dbTeachers.insertTeacher({
                        username: email,
                        email: email
                    }, (result, error) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result.insertId);
                    })
                } else {
                    //return the id of the first result
                    resolve(result[0].id)
                }
            });
        } else {
            reject(`Invalid email address : ${email}`)
        }
    });
};

const getStudentId = function (email, teacherId) {
    return new Promise(function (resolve, reject) {
        if (validator.validate(email)) {
            try {
                dbStudents.getStudentsByEmail(email, (result) => {

                    //teacher does not exist insert new teacher
                    if (result.length === 0) {
                        dbStudents.insertStudent({
                            username: email,
                            email: email
                        }, (result) => {
                            resolve({
                                student_id: result.insertId,
                                teacher_id: teacherId
                            });
                        })
                    } else {

                        //return the id of the first result
                        resolve({
                            student_id: result[0].id,
                            teacher_id: teacherId
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        } else {
            reject(`Invalid email address : ${email}`);
        }
    });
};


const handleError = function (err) {
    throw new Error(err);
};

/**
 * For now, if the email address of the teacher does not
 * exist, we are going to just create the teacher and student
 *
 * @param {string} teacher the email of the teacher
 * @param {Array.<string>} students An array of student emails
 * @param callback
 * @param errorCallback
 */
const mapTeacherToStudent = function (teacher, students, callback, errorCallback) {

    getTeacherId(teacher).then((teacherId) => {
        //get the student IDs
        let list = [];
        students.forEach(function (student) {
            list.push(getStudentId(student, teacherId));
        });

        return Promise.all(list);

    }, handleError).then(function (result) {
        //map the teacher to user here
        let list = [];

        result.forEach(function (map) {
            list.push(new Promise(function (resolve, reject) {
                dbMap.insertMap(map.teacher_id, map.student_id, (result, error) => {
                    if(error) {
                        reject(error);
                        return;
                    }
                    resolve(result[0].insertId);
                });
            }))
        });

        return Promise.all(list);

    }, handleError).then(function () {
        callback({
            message: "Successfully added students to teacher"
        });
    }).catch(function (error) {
        errorCallback(error)
    });
};

/**
 * Get students who are attached to a teacher
 * @param email
 * @param callback
 * @param errorCallback
 */
const getStudentsByTeacher = function (email, callback, errorCallback) {
    new Promise(function (resolve, reject) {
        dbMap.getStudentsByTeacher(email, (result, error) => {
            if (error)
                reject(error);
            resolve(result);
        });
    }).then(function (result) {
        let students = [];
        result.forEach((element) => {
            students.push(element.email);
        });
        callback({
            students
        });
    }).catch(function (error) {
        errorCallback(error);
    });
};

module.exports = {
    mapTeacherToStudent,
    getStudentsByTeacher
};
