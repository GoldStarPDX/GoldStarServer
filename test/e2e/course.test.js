const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('courses', () => {
    before(db.drop);

    let teacher = null;

    before(() => {
        return request.post('/api/authTeacher/signup')
            
            .send({
                name: 'Joe Teacher',
                email: 'Joe@aol.com',
                password: '123'
            })
            .then(res => res.body)
            .then(savedTeacher => teacher = savedTeacher);
    });

    const course = {
        title: 'Test Course',
        date: 'September 2017'
    };

    function saveCourse(course) {
        course.teacher = teacher._id;
        return request
            .post('/api/courses')
            .send(course)
            .then(res => res.body);
    }

    it('saves a course', () => {
        return saveCourse(course)
            .then(saved => {
                assert.ok(saved._id);
                course = saved;
            })
            .then(() => {
                return request.get(`/api/courses/${course._id}`);
            })
            .then(res => res.body)
            .then(got => {
                assert.deepEqual(got, course);
            });
    });
});