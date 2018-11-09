const expect = require('expect');
const request = require('supertest');
const rewire = require('rewire');
const app = require('../server');




describe("Student test suite", () => {
    it('Should be able to request for student information', (done) => {
        request(app)
            .get('/api/students')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    'name': 'John',
                    'age': "30",
                    'email': 'email@example.com'
                });
            }).end(done);

    });



    it('Should be able to add a student', (done) => {
        //todo: add the endpoint for adding a student

        done();
    });

    describe("DB tests", () => {
        var student = rewire('../db/models/students');

        beforeEach(() => {
            student = rewire('../db/models/students');
        });

        after(()=>{
            console.log("student Connection closed");
            student.connection.end();
        });

        var user = {
            username : 'marklauyq',
            email : 'mark.lau@chope.co',
        };

        it('should insert the correct data into the students DB', () => {
            var connection = {
                query: function (a, b, c) { },
                escape: function () { },
                end: function () { }
            };

            var spy = expect.spyOn(connection, 'query');

            student.__set__('connection', connection);

            student.insertStudent(user, () => {
            });

            // expect(connection.query).toHaveBeenCalled();


            expect(spy.calls.length).toEqual(1);
            expect(spy.calls[0].arguments[1].length).toEqual(4);
            expect(spy.calls[0].arguments[1][2]).toEqual(0);
            expect(spy.calls[0].arguments[1][0]).toEqual(user.username);
            expect(spy.calls[0].arguments[1][1]).toEqual(user.email);


            spy.restore();

        });

        it("should retrieve the correct student", (done) => {

            student.getStudent(1, (result, fields) => {
                expect(result.length).toEqual(1);
                expect(result[0]).toContain(user);


                done();
            })
        });

        it("should suspend the student correctly", (done) => {
            student.suspendStudent(1, (result, fields) => {

                student.getStudent(1, (result, fields) => {
                    expect(result.length).toEqual(1);
                    user.is_suspended = 1;
                    expect(result[0]).toContain(user);
                    done();
                });
            })
        });

        
        it("should unsuspend the student correctly", (done) => {
            student.unSuspendStudent(1, (result, fields) => {

                student.getStudent(1, (result, fields) => {
                    expect(result.length).toEqual(1);
                    user.is_suspended = 0
                    expect(result[0]).toContain(user);
                    done();
                });
            })
        });


        it('should be able to get student by email', (done) => {
            student.getStudentsByEmail('mark.lau@chope.co', (result, fields)=>{
                expect(result.length).toEqual(1);
                expect(result[0]).toContain(user);
                done();
            })
        });
    });
});
