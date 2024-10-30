const { response } = require('express');
const supertest = require('supertest');
const request = supertest('http://localhost:3000');

const SampleVisitor1 = {
	"V_ID": 5,
	"V_name": "Ion",
	"V_age": 27,
	"V_gender": "Male",
	"V_ICnum": "950423-05-5555",
	"V_email": "ion123@gmail.com",
	"V_contact": "015-555 5555",
	"V_blacklist": false,
	"V_password": "87531"
};

const SampleVisitorUpdate1 = {
	"V_ID": 5,
	"V_name": "Ion",
	"V_age": 27,
	"V_gender": "Male",
	"V_ICnum": "950423-05-5555",
	"V_email": "ion123@gmail.com",
	"V_contact": "015-731 2465",
	"V_blacklist": false,
	"V_password": "87531"
};

const Reservation1 = {
    "R_ID": 104,
    "V_ID": 5,
    "V_name": "Ion",
    "R_date": "2022-10-03",
    "R_time": "09:00",
    "No_Counter": 4,
    "R_parkingLot": {
        "Slot": "A11",
        "No_Vehicle": "JHE 5321"
    }
}

const verifyReservation1 = {
    "R_ID": 104,
    "V_ID": 5,
    "V_name": "Ion",
    "R_date": "2022-10-20",
    "R_time": "15:00",
    "No_Counter": 4,
    "R_parkingLot": {
        "Slot": "A18",
        "No_Vehicle": "JHE 5321"
    }
}

const SampleAdmin1 = {
    "AdminName": "Gary",
    "AdminPassword": "Garypassword",
    "AdminEmail": "gary123@gmail.com",
    "AdminContact": "016-778 9121"
}

const SampleSecurity1 = {
    "SecurityName": "Peter",
    "SecurityPassword": "Peterpassword",
    "SecurityEmail": "peter123@gmail.com",
    "SecurityContact": "016-731 0231"
}

const SampleSecurityUpdate1 = {
    "SecurityName": "Peter",
    "SecurityPassword": "Peterpassword",
    "SecurityEmail": "peter123@gmail.com",
    "SecurityContact": "011-731 0231"
}

const existAdmin = {
    "AdminName": "Afiqah",
    "AdminPassword": "Afiqahpassword",
    "AdminEmail": "afiqah734@gmail.com",
    "AdminContact": "010-2854084"
}

const existAdminUpdate = {
    "AdminName": "Afiqah",
    "AdminPassword": "Afiqahpassword",
    "AdminEmail": "afiqah734@gmail.com",
    "AdminContact": "012-823 0121"
};

const existVisitor = {
    "V_ID": 3005,
    "V_name": "Tonny",
    "V_age": 35,
    "V_gender": "Male",
    "V_ICnum": "871221-16-1111",
    "V_email": "tonny123@gmail.com",
    "V_contact": "012-333 1234",
    "V_blacklist": false,
    "V_password": "13221"
}

const existReservation = {
    "R_ID": 1001,
    "V_ID": 3005,     
    "V_name": "Tonny",   
    "R_date": "2022-10-05",
    "R_time": "15:00",
    "No_Counter": 4,
    "R_parkingLot": {
        "Slot": "A16",
        "No_Vehicle": "YIW 5555"
    }
}

describe('Express Route Test', function () {

	/******************************** Security test ********************************/

	it('New security registration', async () => {
		return request
			.post('/register/security')
			.send(SampleSecurity1)
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toBe("Security Registeration Success");
			});
	});

	let tokenSecurity;

	it ('Login as security and it should return access token for security', async() => {
		const res = await request
			.post('/loginSecurity')
			.send({ SecurityName: SampleSecurity1.SecurityName, SecurityPassword: SampleSecurity1.SecurityPassword })
		tokenSecurity = res.body.token
	})

	it('"General Info Security update successfully', async () => {
		return request
			.patch('/security/updateGeneralInfoSecurity/Peter')
			.set('Authorization', `Bearer ${tokenSecurity}`)
			.send(SampleSecurityUpdate1)
			.expect('Content-Type', /json/)
			.expect(200)
			.then(response => {
				expect(response.body.SecurityName).toBe(SampleSecurityUpdate1.SecurityName);
				expect(response.body.SecurityEmail).toBe(SampleSecurityUpdate1.SecurityEmail);
				expect(response.body.SecurityContact).toBe(SampleSecurityUpdate1.SecurityContact);
				expect(response.body.role).toBe("security");
			});
	});

	it('"Password Security update successfully', async () => {
		return request
			.patch('/security/updatePasswordSecurity/Peter')
			.set('Authorization', `Bearer ${tokenSecurity}`)
			.send({ SecurityName: SampleSecurity1.SecurityName, SecurityPassword: SampleSecurity1.SecurityPassword })
			.expect('Content-Type', /text/)
			.expect(200)
			.then(response => {
				expect(response.text).toBe("Password update successful");
			});
	});

	it('"New admin registration', async () => {
		return request
			.post('/security/registerAdmin')
			.set('Authorization', `Bearer ${tokenSecurity}`)
			.send(SampleAdmin1)
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toBe("Admin Registeration Success");
			});
	});

	it('"Password Admin update successfully', async () => {
		return request
			.patch('/security/updatePasswordAdmin/Gary')
			.set('Authorization', `Bearer ${tokenSecurity}`)
			.send({ AdminName: SampleAdmin1.AdminName, AdminPassword: "sampleadmin1newpassword"})
			.expect('Content-Type', /text/)
			.expect(200)
			.then(response => {
				expect(response.text).toBe("Password update successful");
			});
	});

	it('Admin deleted successful', async () => {
		return request
			.delete('/security/deleteAdmin/Gary')
			.set('Authorization', `Bearer ${tokenSecurity}`)
			.send({AdminName: SampleAdmin1.AdminName})
			.expect('Content-Type', /text/)
			.expect(200)
			.then(response => {
				expect(response.text).toBe("The admin is deleted");
			});
	});


});


