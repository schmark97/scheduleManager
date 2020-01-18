const expect = require("chai").expect;
const getScheduleMW = require("../../../../middleware/schedule/getScheduleMW");

describe("getSchedule middleware", function() {
  it("should return a shedule", function(done) {
    const objectRepository = {
      ScheduleModel: {
        findOne: () => {}
      }
    };

    const req = {
      params: { id: null }
    };
    const mw = getScheduleMW(objectRepository);

    mw(req, {}, () => {});
    done();
  });
});
