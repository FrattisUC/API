const { app, expect } = require('../common');
const helper = require('./../helpers/database.helper.js')

/* Get a reference to Models */
const Problem = app.models.Problem;
const ProblemSet = app.models.ProblemSet;
const Submission = app.model.Submission;
const Human = app.model.Human;

const request = require('supertest');

describe('Problem Routes', () => {
    Problem.create({name: "Name", description: "Description"}).then(
        res => {
            ApiProblems(res);
        }
    );

    Problem.create({name: "Name", description: "Description"}).then(
        res => {
            ApiProblemsId(res);
        }
    );

    Problem.create({name: "Name", description: "Description"}).then(
        res => {
            ApiProblemIdProblemSet(res);
        }
    );
    
    const ApiProblems = (p) => {

        describe ('Route /api/problems', () => {

            describe('GET /api/problems', () => {
                it('should respond with json', (done) => {
                    request(app)
                    .get('/api/Problems')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
            
            describe('POST /api/problems', () => {
                it('should respond with json', (done) => {
        
                    let body  = {
                        name: "string",
                        isProgram: false,
                        description: "string"
                    };
        
                    request(app)
                        .post('/api/Problems')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PUT /api/problems', () => {
                it('should respond with json', (done) => {

                    let body  = {
                        name: p.name + "_new",
                        id: p.id
                    };
                    
                    request(app)
                        .get('/api/Problems')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PATCH /api/problems', () => {
                let body  = {
                    name: p.name + "_new_patch",
                    id: p.id
                };
        
                it('respond with json', (done) => {
                    request(app)
                    .get('/api/Problems')
                    .set('Accept', 'application/json')
                    .send(body)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
        });
    };

    const ApiProblemsId = (p) => {
        describe ('Route /api/problems/{id}', () => {
            describe('GET /api/problems/{id}', () => {
                it('should respond with json', (done) => {
                    request(app)
                        .get('/api/Problems/'+p.id)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PUT /api/problems/{id}', () => {
                it('should respond with json', (done) => {
                    let body  = {
                        name: p.name + "_new",
                        description: p.description + "_new"
                    };

                    request(app)
                        .put('/api/Problems/'+p.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        
            describe('PATCH /api/problems/{id}', () => {
                it('should respond with json', (done) => {
                    let body  = {
                        name: p.name + "_new"
                    };

                    request(app)
                        .patch('/api/Problems/'+p.id)
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });
        });
    }

    const ApiProblemIdProblemSet = (p) => {

        describe ('Route /api/Problems/{id}/problemSets', () => {
            describe('GET /api/Problems/{id}/problemSets', () => {
                it('should respond with json', (done) => {
                    request(app)
                    .get('/api/Problems/'+p.id+'/problemSets')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                });
            });
            
            describe('POST /api/Problems/{id}/problemSets', () => {
                it('should respond with json', (done) => {
        
                    let body  = {
                        name: "string",
                        description: "string",
                        startTime: "2018-05-11T19:29:24.666Z",
                        endTime: "2018-05-11T23:29:24.666Z",
                        restrictedAccess: false
                      };
        
                    request(app)
                        .post('/api/Problems/'+p.id+'/problemSets')
                        .set('Accept', 'application/json')
                        .send(body)
                        .expect('Content-Type', /json/)
                        .expect(200, done);
                });
            });

            describe('PUT /api/Problems/{id}/problemSets/{fk}/rel/', () => {
                it('should respond with json', (done) => {
                    ProblemSet.create({
                        name: "string",
                        description: "string",
                        startTime: "2018-05-11T19:29:24.666Z",
                        endTime: "2018-05-11T23:29:24.666Z",
                        restrictedAccess: false
                    }).then(
                        ps => {
                            let body  = {
                                "problemSetId": p.id,
                                "problemId": ps.id
                              };
                              
                            request(app)
                                .put('/api/Problems/'+p.id+'/problemSets/rel/'+ps.id)
                                .set('Accept', 'application/json')
                                .send(body)
                                .expect('Content-Type', /json/)
                                .expect(200, done);
                        }
                    );
                });
            });
        });
    };

    /** For Human D: */
    // const ApiProblemIdSubmissions = (p) => {
    //     /**GET /Problems/{id}/submissions */
    //     describe ('Route /api/Problems/{id}/submissions', () => {
    //         describe('GET /api/Problems/{id}/submissions', () => {
    //             it('should respond with json', (done) => {
    //                 request(app)
    //                 .get('/api/Problems/'+p.id+'/submissions')
    //                 .set('Accept', 'application/json')
    //                 .expect('Content-Type', /json/)
    //                 .expect(200, done);
    //             });
    //         });
            
    //         describe('POST /api/Problems/{id}/submissions', () => {
    //             it('should respond with json', (done) => {
    //                 Human.create({
    //                     email: "string@gnirts.rev",
    //                     username: "name",
    //                     password: "password",
    //                     emailVerified: true
    //                 }).
    //                 then( h => {
    //                     let body  = {
    //                         problemId: p.id,
    //                         userId: h.id,
    //                         status: 0,
    //                         urlContent: "string",
    //                         kattisResult: "string"
    //                     };
            
    //                     request(app)
    //                         .post('/api/Problems/'+p.id+'/submissions')
    //                         .set('Accept', 'application/json')
    //                         .send(body)
    //                         .expect('Content-Type', /json/)
    //                         .expect(200, done);
    //                 });
    //             });
    //         });

    //         describe('PUT /api/Problems/{id}/submissions/{fk}/rel/', () => {
    //             it('should respond with json', (done) => {
    //                 Human.create({
    //                     email: "string@gnirts.rev",
    //                     username: "name",
    //                     password: "password",
    //                     emailVerified: true
    //                 }).then(
    //                     h => Submission.create({
    //                         problemId: p.id,
    //                         userId: h.id,
    //                         status: 0,
    //                         urlContent: "string",
    //                         kattisResult: "string"
    //                     }).then(
    //                         s => {
    //                             let body  = {
    //                                 "problemSetId": p.id,
    //                                 "problemId": s.id
    //                               };
                                  
    //                             request(app)
    //                                 .put('/api/Problems/'+p.id+'/problemSets/rel/'+ps.id)
    //                                 .set('Accept', 'application/json')
    //                                 .send(body)
    //                                 .expect('Content-Type', /json/)
    //                                 .expect(200, done);
    //                         }
    //                     );
    //                 );
    //             });
    //         });
    //     });
    // };

    describe('DELETE /api/problems/{id}', () => {
        it('should respond with json', (done) => {
            Problem.create({name: "Name", description: "Description"}).then(
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

    describe('DELETE /api/Problems/{id}/problemSets', () => {
        it('should respond with json', (done) => {
            Problem.create({name: "Name", description: "Description"}).then(
                res => {
                    request(app)
                    .delete('/api/Problems/'+res.id+'/problemSets')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(204, done);
                }
            );
        });
    });


});

