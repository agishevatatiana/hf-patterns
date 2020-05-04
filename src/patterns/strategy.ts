// strategy pattern
interface ReportBehavior {
	generateReport(): string;
}

class FullReport implements ReportBehavior {
	generateReport(): string {
		return 'Generate full report.'
	}
}

class ArticlesReport implements ReportBehavior {
	generateReport(): string {
		return 'Generate articles report.'
	}
}

class UpdatesReport implements ReportBehavior {
	generateReport(): string {
		return 'Generate updates report.'
	}
}

// user class
class User {
	reportBehavior: ReportBehavior;

	performReport(): string {
		return this.reportBehavior.generateReport();
	}

	// users can change default report
	setReport(report: ReportBehavior): void {
		this.reportBehavior = report;
	}

	// ...other methods
}

class Admin extends User {
	constructor() {
		super();
		this.reportBehavior = new FullReport();
	}
}

class Member extends User {
	constructor() {
		super();
		this.reportBehavior = new ArticlesReport();
	}
}
// ... other users


// test report
class TestStrategy {
	// test report
  	private users = <any>{
      	admin: new Admin(), // full report
      	member: new Member() // articles report
  	};

  	getReportBtnClick(userType: string): void {
      	console.log(userType, ': ', this.users[userType].performReport());
  	}

  	changeReport(userType: string): void {
		this.users[userType].setReport(new UpdatesReport());
      	this.getReportBtnClick(userType) // updates report
  	}
}

const testStrategy = new TestStrategy();
testStrategy.getReportBtnClick('admin');
testStrategy.getReportBtnClick('member');
// changeReport
testStrategy.changeReport('member');
