var User = require('./models/user.js');
var DiscreteDash = require('./models/dash.js').Discrete;
var ContinuousDash = require('./models/dash.js').Continuous;

var userData = [
  {
    firstName: "James",
    lastName: "Mathis",
    username: "jmathis",
    passwordHash: "boathub2$",
    email: "jmathis@yahoo.com",
    discreteDashes: ["55e7ccc1679ccbe15f8bb0af", "55e7ccc1679ccbe15f8bb0b0", "55e7ccc1679ccbe15f8bb0b7"],
    continuousDashes: ["55e7ccc1679ccbe15f8bb0bc"]
  },
  {
    firstName: "Dan",
    lastName: "Major",
    username: "dmajorasmask",
    passwordHash: "battlestations2",
    email:"zeldalover123@gmail.com",
    discreteDashes: ["55e7ccc1679ccbe15f8bb0b1", "55e7ccc1679ccbe15f8bb0b3", "55e7ccc1679ccbe15f8bb0b5", "55e7ccc1679ccbe15f8bb0b8"],
    continuousDashes: ["55e7ccc1679ccbe15f8bb0bb"]
  },
  {
    firstName: "Alex",
    lastName: "Cameron",
    username: "electricppl24",
    passwordHash: "easylover2#$",
    email: "cam@hotmail.com",
    discreteDashes: ["55e7ccc1679ccbe15f8bb0b2", "55e7ccc1679ccbe15f8bb0b4", "55e7ccc1679ccbe15f8bb0b6"],
    continuousDashes: ["55e7ccc1679ccbe15f8bb0b9","55e7ccc1679ccbe15f8bb0ba"]
  }
];

console.log('Started Seed');
var dataArr = [];
userData.forEach(function(element) {
  dataArr.push(User.create(element));
});
Promise.all(dataArr).then(function() {
  console.log('Finished Seeding');
})
