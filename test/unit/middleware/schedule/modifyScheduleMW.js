const expect = require("chai").expect;
const modifyScheduleMW = require("../../../../middleware/schedule/modifyScheduleMW");

describe("modifySchedule middleware", function() {
  it("should redirect to /schedule if there was no problem", function(done) {
    const objectRepo = {
      ScheduleModel: {}
    };

    const mw = modifyScheduleMW(objectRepo);
    const req = {
      body: {
        date: "2020-01-19",
        btime: "08:00",
        etime: "16:00",
        emp1:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : dasd@gmail.com, code : das, password : $2b$10$50cxVvhfb1ouNZT7Va5GTOeWlyqIYmWIXvR.XWZCZFVklTg2A.dvW, __v : 0",
        emp2:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : dasda@gmail.com, code : das, password : $2b$10$50cxVvhfb1ouNZT7Va5GTOeWlyqIYmWIXvR.XWZCZFVklTg2A.dvW, __v : 0"
      }
    };

    let res = {
      locals: {
        schedule: {
          save: cb => {
            cb();
          }
        }
      },
      redirect: par => {
        expect(par).to.be.eql("/schedule");
        done();
      }
    };

    mw(req, res, () => {});
  });

  it("should call next with error if there is db problem", function(done) {
    const objectRepo = {
      ScheduleModel: {}
    };

    const mw = modifyScheduleMW(objectRepo);
    const req = {
      body: {
        date: "2020-01-19",
        btime: "08:00",
        etime: "16:00",
        emp1:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : dasdas@gmail.com, code : das, password : $sdasd __v : 0",
        emp2:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : dasdas1@gmail.com, code : das, password : $2b$10$sdasd, __v : 0"
      }
    };

    let res = {
      locals: {
        schedule: {
          save: cb => {
            cb("dbError");
          }
        }
      }
    };

    mw(req, res, err => {
      expect(err).to.be.eql("dbError");
      done();
    });
  });

  it("should set res.locals.schedule to a new schedule", function(done) {
    class ScheduleModelMock {
      save(cb) {
        cb();
      }
    }
    const objectRepo = {
      ScheduleModel: ScheduleModelMock
    };

    const mw = modifyScheduleMW(objectRepo);
    const req = {
      body: {
        date: "2020-01-19",
        btime: "08:00",
        etime: "16:00",
        emp1:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : dasdad@gmail.com, code : das, password : $dasdasdas, __v : 0",
        emp2:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : dsasdasdasd@gmail.com, code : das, password : dasdasdasdasda, __v : 0"
      }
    };

    let res = {
      locals: {},
      redirect: par => {
        expect(par).to.be.eql("/schedule");
        done();
      }
    };

    mw(req, res, () => {});
  });

  //ha egy masik adat hianyzik akkor hasonloan
  it("should call next if no sufficient data was provided", function(done) {
    const objectRepo = {
      ScheduleModel: {}
    };

    const mw = modifyScheduleMW(objectRepo);
    const req = {
      body: {
        date: undefined,
        btime: "08:00",
        etime: "16:00",
        emp1:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : asdf1@gmail.com, code : das, password : dasdasdasda, __v : 0",
        emp2:
          "_id : ObjectId(5e1dd8c627d462275d48f49d), name : Mark, email : asf1@gmail.com, code : das, password : dasdasdasdasd, __v : 0"
      }
    };

    let res = {
      locals: {
        schedule: {
          save: cb => {
            cb();
          }
        }
      },
      redirect: par => {}
    };

    mw(req, res, () => {
      expect(req.body.date).to.be.eql(undefined);
      done();
    });
  });
});
