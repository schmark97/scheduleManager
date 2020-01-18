module.exports = () => {
  return (req, res, next) => {
    res.locals.schedules.sort((a, b) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);

      if (d1 < d2) return -1;
      if (d1 > d2) return 1;

      if (a.bTime < b.bTime) return -1;
      if (a.bTime > b.bTime) return 1;

      return 0;
    });
    return next();
  };
};
