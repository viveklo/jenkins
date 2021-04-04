// Include the chrome driver
require("chromedriver");

// Include selenium webdriver
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

// Get the credentials from the JSON file
let { fullname, rediffid } = require("./rediff.json");

// Step 1 - Opening the geeksforgeeks sign in page
let tabToOpen =
	tab.get("https://register.rediff.com/register/register.php?FormName=user_details");
tabToOpen
	.then(function () {

		// Timeout to wait if connection is slow
		let findTimeOutP =
			tab.manage().setTimeouts({
				implicit: 10000, // 10 seconds
			});
		return findTimeOutP;
	})
	.then(function () {

		// Step 2 - Finding the username input
		let promiseUsernameBox =
			//tab.findElement(swd.By.css("#luser"));
			tab.findElement(swd.By.xpath("//input[contains(@name, 'name')]"));
		return promiseUsernameBox;
	})
	.then(function (usernameBox) {

		// Step 3 - Entering the username
		let promiseFillUsername =
			usernameBox.sendKeys(fullname);
		return promiseFillUsername;
	})

	.then(function () {

		// Step 2 - Finding the rediffid input
		let promiserediffidBox =
			//tab.findElement(swd.By.css("#luser"));
			tab.findElement(swd.By.xpath("/html/body/center/form/div/table[2]/tbody/tr[7]/td[3]/input[1]"));
		return promiserediffidBox;
	})
	.then(function (rediffBox) {

		// Step 3 - Entering the username
		let promiseFillrediffid =
			rediffBox.sendKeys(rediffid);
		return promiseFillrediffid;
	})
	.catch(function (err) {
		console.log("Error ", err, " occurred!");
	});
