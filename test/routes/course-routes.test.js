const { app, expect } = require('../common');
const helper = require('./../helpers/database.helper.js');
const uuid = require('uuid-v4');

/* Get a reference to Models */
const Course = app.models.Course;
const Human = app.models.Human;
const Role = app.models.HumanRole;
const UserRoleCourse = app.models.UserRoleCourse;

const request = require('supertest');


describe('Course Routes', () => {
    //before(helper.givenEmptyDatabase);

    Course.create({ name: "Nombre Seccion", section: 1, year: 2018, period: 1}).then(
        res => {
            ApiCourses(res);
        }
    );

    Course.create({ name: "Nombre Seccion 1", section: 2, year: 2017, period: 1}).then(
        res => {
            ApiCoursesId(res);  
        }
    );

    Course.create({ name: "Nombre Seccion 2", section: 3, year: 2018, period: 1}).then(
        c => {
            const newID = uuid();
            Human.create({email: "string2@"+newID+".rev", username: "name_"+newID, password: "password", emailVerified: true}).then(
                h => {
                    r = { id: 2 };
                    ApiCoursesUserRoleCourses(c, h, r);
                }
            )
        }
    );
    
    const ApiCourses = (c) => {

        describe ('Route /api/courses', () => {

            describe('GET /api/courses', () => {
                it('should respond with json', (done) => {
                    request(app)
                    .get('/api/courses')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
            
            describe('POST /api/courses', () => {
                it('should respond with json', (done) => {
        
                    let body  = {
                        name: "Nombre Seccion POST api/courses", 
                        section: 2, 
                        year: 2017, 
                        period: 2
                    };
        
                    request(app)
                        .post('/api/courses')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PUT /api/courses', () => {
                it('should respond with json', (done) => {

                    let body  = {
                        name: c.name + "PUT api/courses _new",
                        id: c.id
                    };
                    
                    request(app)
                        .get('/api/courses')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PATCH /api/courses', () => {
                let body  = {
                    name: c.name + "_new_patch",
                    id: c.id
                };
        
                it('respond with json', (done) => {
                    request(app)
                    .get('/api/courses')
                    .set('Accept', 'application/json')
                    .send(body)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
        });
    };

    const ApiCoursesId = (c) => {
        describe ('Route /api/courses/{id}', () => {

            describe('GET /api/courses/{id}', () => {
                it('should respond with json', (done) => {
                    request(app)
                        .get('/api/courses/'+c.id)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PUT /api/courses/{id}', () => {
                it('should respond with json', (done) => {
                    let body  = {
                        name: c.name + "_new",
                        year: c.year + 1
                    };

                    request(app)
                        .put('/api/courses/'+c.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PATCH /api/courses/{id}', () => {
                it('should respond with json', (done) => {
                    let body  = {
                        name: c.name + "_new",
                        year: c.year - 1
                    };

                    request(app)
                        .patch('/api/courses/'+c.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        });
    }

    /* Triple table */
    const ApiCoursesUserRoleCourses = (c, h, r) => {

        describe ('Route /api/courses/{id}/userRoleCourses', () => {
            describe('GET /api/courses/{id}/userRoleCourses', () => {
                it('should respond with json', (done) => {
                    request(app)
                    .get('/api/Courses/'+c.id+'/userRoleCourses')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
            
            describe('POST /api/courses/{id}/userRoleCourses', () => {
                it('should respond with json', (done) => {
        
                    let body  = {
                        humanId: h.id,
                        roleId: r.id,
                        courseId: c.id
                    };
        
                    request(app)
                        .post('/api/courses/'+c.id+'/userRoleCourses')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });

            describe('PUT /api/courses/{id}/userRoleCourses/{fk}', () => {
                it('should respond with json', (done) => {
                    
                    UserRoleCourse.findOne({where:{ courseId: c.id }}).then( (urc) => {
                        let body  = {
                            roleId: 3
                        };

                        request(app)
                        .put('/api/courses/'+c.id+'/userRoleCourses/'+urc.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);

                    });
                });
            });
        });
    };


    describe('DELETE /api/courses/{id}', () => {
        it('should respond with json', (done) => {
            Course.create({ name: "Nombre Seccion 2", section: 3, year: 2018, period: 1}).then(
                res => {
                    request(app)
                    .delete('/api/Problems/'+res.id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                }
            );
        });
    });

    describe('DELETE /api/courses/{id}/userRoleCourses/', () => {
        it('should respond with json', (done) => {
            Course.create({ name: "Nombre Seccion 2", section: 3, year: 2018, period: 1}).then(
                res => {
                    request(app)
                    .delete('/api/courses/'+res.id+'/userRoleCourses/')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(204, done);
                }
            );
        });
    });
});

