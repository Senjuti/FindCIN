var casper = require('casper').create({
	verbose: true,
    logLevel: "debug"
});

//1. Open page
casper.start('http://mca.gov.in/DCAPortalWeb/dca/MyMCALogin.do?method=setDefaultProperty&mode=14');

//2. Click on 2nd radio button in page
casper.then(function() {
    this.click('tr:nth-child(5) input');
});

//3. Click on #searchCriteria
casper.then(function() {
	this.click('#searchCriteria');
});

//4. Select CONT option in dropdown list and fill up company name
casper.then(function() {
	this.fill('form[name="CompanyCINSRForm"]', {
		'searchCriteria' : 'CONT',
		'companyName' : 'Microsoft'
	}, false);
});

//5. Click on Submit button
casper.then(function() {
	this.click('#Default');
});

//Utility to check if we have redirected to correct next page
casper.then(function() {
    console.log('clicked Submit, new location is ' + this.getCurrentUrl());
});

casper.then(function() {
	 this.echo(this.getTitle());
// Get info on all elements matching this CSS selector
  var name_selector = 'table[id="list1"] tbody tr td:nth-of-type(2)';
  var cin_selector = 'table[id="list1"] tbody tr td:nth-of-type(3)';
  var names_info = this.getElementsInfo(name_selector); 
  var cin_info = this.getElementsInfo(cin_selector);

  var names = [];
  var cin = [];
  for (var i = 0; i < names_info.length; i++) {
    names.push(names_info[i].text);
    cin.push(cin_info[i].text);
  }
  // Dump the array to screen
  require('utils').dump(names);
  require('utils').dump(cin);
  //Print out CIN to output.txt
  var fs = require('fs');
  var myfile = "output.txt"
  fs.write(myfile, cin, 'w');
});

/*
//Utility permitting you to see a screenshot of what's happening at any time
casper.then(function() {
	this.capture("result.png");
})

*/

casper.run();