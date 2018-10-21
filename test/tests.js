var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
var Promise = require("bluebird");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs');
const path = require('path');
const dir = './test/data/';
const testFolder = './test/data';
let testCaseNames = fs.readFileSync(dir + 'description.txt', 'utf8').toString().split('\n');


describe('git_test ', function() {
	this.timeout(120*1000);

	let id = 0;
	fs.readdirSync(testFolder).sort().forEach(file => {
		if (file[0] != '.' && file != 'description.txt') {
			it(testCaseNames[id], (done) => {
				let i = 0;
				let event = [];
				fs.readFileSync(dir + file, 'utf8').toString().split('\n').forEach(function (line) {
					i += 1;
					if (line) {
						event.push(line);
					}	
				});
				Promise.mapSeries(event, (e) => {
					let eve = JSON.parse(e);
					if(eve.request.method == "DELETE") {
						return chai.request(server)
							.delete(eve.request.url)
							.then((res) => {
								return res;
							}).catch((err) => {
								return err;
							});
					}
					if (eve.request.method == "GET") {
						return chai.request(server)
							.get(eve.request.url)
							.then((res) => {
								return res;
							}).catch((err) => {
								return err;
							});
					}
					if (eve.request.method == "POST") {
						return chai.request(server)
							.post(eve.request.url)
							.set(eve.request.headers)
							.send(eve.request.body)
							.then((res) => {
								return res;
							}).catch((err) => {
								return err;
							});
					}
					if(eve.request.method == "PUT") {
						return chai.request(server)
								   .put(eve.request.url)
								   .set(eve.request.headers)
								   .send(eve.request.body)
								   .then((res) => {
								   		return res;
								   }).catch((err) => {
								   		return err;
								   });
					}


				}).then((results) => {
					for (let j = 0; j < results.length; j++) {
						let e = JSON.parse(event[j]);
						if(e.request.method == "GET") {
							results[j].should.have.status(e.response.status_code);
							let ar1 = results[j].body;
							let ar2 = e.response.body;
							if(e.response.status_code == 404) {
								continue;
							}
		 					expect(ar2.length).to.equal(ar1.length);
							for (let k = 0; k < ar1.length; k++) {
								expect(ar2[k]).to.deep.equal(ar1[k]);
							}
						}
						if (e.request.method == "POST") {
							expect(results[j].status).to.equal(e.response.status_code);
						}
						if (e.request.method == "DELETE") {
							expect(results[j].status).to.equal(e.response.status_code);
						}
						if (e.request.method == "PUT") {
							expect(results[j].status).to.equal(e.response.status_code);
						}
					}
					done();
				}).catch((err) => {
					console.log(err);
					done(err);
				});
			});
			id += 1;
		}
	})

});