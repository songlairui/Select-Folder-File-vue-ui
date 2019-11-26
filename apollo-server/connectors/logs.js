const shortId = require("shortid");

let logs = [];

exports.add = function(log) {
  const item = {
    id: shortId.generate(),
    date: new Date().toISOString(),
    tag: null,
    ...log
  };
  logs.push(item);
  console.info(Object.values(log));
  return item;
};

exports.list = function() {
  return logs;
};

exports.last = function() {
  if (logs.length) {
    return logs[logs.length - 1];
  }
  return null;
};

exports.clear = function() {
  logs = [];
  return logs;
};
