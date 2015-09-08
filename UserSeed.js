var User = require('./models/user.js');
var DiscreteDash = require('./models/dash.js').Discrete;
var ContinuousDash = require('./models/dash.js').Continuous;

User.remove({}, function() {
  var userData = [
    {
      firstName: "James",
      lastName: "Mathis",
      username: "jmathis",
      passwordHash: "boathub2$",
      email: "jmathis@yahoo.com",
      discreteDashes: [],
      continuousDashes: []
    },
    {
      firstName: "Dan",
      lastName: "Major",
      username: "dmajorasmask",
      passwordHash: "battlestations2",
      email:"zeldalover123@gmail.com",
      discreteDashes: [],
      continuousDashes: []
    },
    {
      firstName: "Alex",
      lastName: "Cameron",
      username: "electricppl24",
      passwordHash: "easylover2#$",
      email: "cam@hotmail.com",
      discreteDashes: [],
      continuousDashes: []
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
});
