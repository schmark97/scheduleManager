const expect = require("chai").expect;
const getScheduleMW = require("../../../../middleware/schedule/getScheduleMW");

describe("getSchedule middleware", function() {
  it("should set res.locals.schedule to an object from the db", function(done) {
    const objectRepository = {
      ScheduleModel: {
        findOne: (id, cb) => {
          expect(id).to.be.eql({ _id: 12 });
          cb(null, "scheduleMock");
        }
      }
    };
    const mw = getScheduleMW(objectRepository);

    let req = {
      params: { id: 12 }
    };

    const res = {
      locals: {
        schedule: null
      }
    };
    mw(req, res, err => {
      expect(err).to.be.eql(undefined);
      expect(res.locals).to.be.eql({ schedule: "scheduleMock" });
      done();
    });
  });

  it("should call next with error if there is a problem", function(done) {
    const objectRepository = {
      ScheduleModel: {
        findOne: (id, cb) => {
          expect(id).to.be.eql({ _id: 12 });
          cb("dbError", "scheduleMock");
        }
      }
    };
    const mw = getScheduleMW(objectRepository);

    let req = {
      params: { id: 12 }
    };

    const res = {
      locals: {
        schedule: null
      }
    };
    mw(req, res, err => {
      expect(err).to.be.eql("dbError");
      done();
    });
  });

  it("should not modify res.locals if no schedule was found", function(done) {
    const objectRepository = {
      ScheduleModel: {
        findOne: (id, cb) => {
          expect(id).to.be.eql({ _id: 12 });
          cb(undefined, null);
        }
      }
    };
    const mw = getScheduleMW(objectRepository);

    let req = {
      params: { id: 12 }
    };

    const res = {
      locals: {
        schedule: undefined
      }
    };
    mw(req, res, err => {
      expect(err).to.be.eql(undefined);
      expect(res.locals).to.be.eql({ schedule: undefined });
      done();
    });
  });
});
