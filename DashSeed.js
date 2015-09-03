var User = require('./models/user.js');
var DiscreteDash = require('./models/dash.js').Discrete;
var ContinuousDash = require('./models/dash.js').Continuous;
var Step = require('./models/step.js');

console.log(Step.schema);
var discreteData = [
    {
        title: "Up-sized",
        description: "Ergonomic 24 hour array",
        startDate: "Fri Aug 07 2015 01:25:08 GMT-0400 (EDT)",
        endDate: "Wed Dec 30 2015 11:46:56 GMT-0500 (EST)",
        steps: [new Step({
          title: "Step 1",
          description: "The first step",
          completed: false,
          date: "Thu Dec 29 2015 08:46:56 GMT-0400 (EST)"
        })]
    },
    {
        title: "Open-source",
        description: "Profit-focused radical product",
        startDate: "Thu Aug 20 2015 03:38:51 GMT-0400 (EDT)",
        endDate: "Sun Nov 22 2015 23:59:31 GMT-0500 (EST)",
        steps: [new Step({
          title: "Step eleventyseven",
          description: "The best step",
          completed: false,
          date: "Tue Dec 27 2015 06:52:00 GMT-0600 (EST)"
        })]

    },
    {
        title: "Exclusive",
        description: "Ergonomic solution-oriented infrastructure",
        startDate: "Sat Nov 08 2014 01:19:11 GMT-0500 (EST)",
        endDate: "Sat Jul 09 2016 18:06:24 GMT-0400 (EDT)",
        steps: [new Step({
          title: "Step hexidecimal duck",
          description: "pretty sweet",
          completed: false,
          date: "Fri Jul 24 2015 06:52:00 GMT-0900 (EST)"
        })]

    },
    {
        title: "Inverse",
        description: "Streamlined contextually-based parallelism",
        startDate: "Wed Dec 17 2014 07:49:14 GMT-0500 (EST)",
        endDate: "Sat Jul 09 2016 19:46:16 GMT-0400 (EDT)",
        steps: [new Step({
          title: "who are the beatles?",
          description: "need to find out who the beatles are cuz i suck",
          completed: true,
          date: "Wed Sep 2 2015 06:52:00 GMT-0900 (EST)"
        })]
    },
    {
        title: "Progressive",
        description: "Sharable mobile workforce",
        startDate: "Thu Jan 22 2015 03:46:07 GMT-0500 (EST)",
        endDate: "Mon May 23 2016 12:47:31 GMT-0400 (EDT)",
        steps: [new Step({
          title: "Step eleventyseven",
          description: "The best step",
          completed: false,
          date: "Tue Dec 27 2015 06:52:00 GMT-0600 (EST)"
        })]
    },
    {
        title: "Profit-focused",
        description: "Phased directional emulation",
        startDate: "Sun Jun 07 2015 04:10:59 GMT-0400 (EDT)",
        endDate: "Sun Jul 10 2016 13:23:18 GMT-0400 (EDT)",
        steps: [new Step({
          title: "Step 1",
          description: "The first step",
          completed: false,
          date: "Thu Dec 29 2015 08:46:56 GMT-0400 (EST)"
        })]
    },
    {
        title: "Up-sized",
        description: "Up-sized bifurcated capability",
        startDate: "Tue Mar 31 2015 06:34:39 GMT-0400 (EDT)",
        endDate: "Sun Aug 07 2016 13:14:18 GMT-0400 (EDT)",
        steps: [new Step({
          title: "Step hexidecimal duck",
          description: "pretty sweet",
          completed: false,
          date: "Fri Jul 24 2015 06:52:00 GMT-0900 (EST)"
        })]
    },
    {
        title: "Adaptive",
        description: "Function-based contextually-based attitude",
        startDate: "Thu Oct 30 2014 04:37:42 GMT-0400 (EDT)",
        endDate: "Sun Jan 10 2016 21:08:31 GMT-0500 (EST)",
        steps: [new Step({
          title: "who are the beatles?",
          description: "need to find out who the beatles are cuz i suck",
          completed: true,
          date: "Wed Sep 2 2015 06:52:00 GMT-0900 (EST)"
        })]
    },
    {
        title: "Versatile",
        description: "Programmable contextually-based hub",
        startDate: "Sat Jan 31 2015 03:56:48 GMT-0500 (EST)",
        endDate: "Tue Aug 02 2016 02:32:39 GMT-0400 (EDT)",
        steps: [new Step({
          title: "Step eleventyseven",
          description: "The best step",
          completed: false,
          date: "Tue Dec 27 2015 06:52:00 GMT-0600 (EST)"
        })]
    },
    {
        title: "Ergonomic",
        description: "Quality-focused impactful core",
        startDate: "Sat Apr 04 2015 16:56:55 GMT-0400 (EDT)",
        endDate: "Sat Apr 23 2016 12:14:29 GMT-0400 (EDT)",
        steps: [new Step({
          title: "Step hexidecimal duck",
          description: "pretty sweet",
          completed: false,
          date: "Fri Jul 24 2015 06:52:00 GMT-0900 (EST)"
        })]
    }
];
var continuousData = [
  {
    title: "Goal1",
    description: "Some Goal",
    startDate: "Thu Aug 05 2015 01:34:08 GMT-0400 (EDT)",
    endDate: "Thu Dec 03 2015 11:46:56 GMT-0500 (EST)",
    target: 50,
    current: 20
  },
  {
    title: "Goal2",
    description: "Some Other Goal",
    startDate: "Mon Aug 02 2015 08:42:06 GMT-0400 (EDT)",
    endDate: "Wed Dec 09 2015 13:50:60 GMT-0500 (EST)",
    target: 60,
    current: 13
  },
  {
    title: "Goal3",
    description: "Big Goal",
    startDate: "Mon Aug 02 2015 08:42:06 GMT-0400 (EDT)",
    endDate: "Wed Dec 09 2015 13:50:00 GMT-0500 (EST)",
    target: 120,
    current: 68
  },
  {
    title: "Some Sweet Goal",
    description: "Cool goal descriptipn",
    startDate: "Sun Jan 04 2015 01:34:08 GMT-0400 (EDT)",
    endDate: "Sat Nov 14 2015 12:31:12 GMT-0500 (EST)",
    target: 50,
    current: 20
  }
];

var dataArr = [];
console.log("Starting Database");
discreteData.forEach(function(element) {
  // dataArr.push(DiscreteDash.create(element).exec());
  dataArr.push(DiscreteDash.create(element));
});
continuousData.forEach(function(element) {
  // dataArr.push(ContinuousData.create(element).exec());
  dataArr.push(ContinuousDash.create(element));
});

Promise.all(dataArr).then(function(results) {
  console.log(results);
  console.log("Finished Seeding");
}).then(null, console.error);
