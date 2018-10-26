// DO NOT PUSH THIS FILE
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const Promise = require('bluebird');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const fs = require('fs');
const path = require('path');
const server = require('../app');

const dir = './test/data/';
const testFolder = './test/data';
const testCaseNames = fs.readFileSync(`${dir}description.txt`, 'utf8').toString().split('\n');


describe('git_test ', function () {
  this.timeout(120 * 1000);

  let id = 0;
  fs.readdirSync(testFolder).sort().forEach((file) => {
    if (file[0] != '.' && file != 'description.txt') {
      it(testCaseNames[id], (done) => {
        let i = 0;
        const event = [];
        fs.readFileSync(dir + file, 'utf8').toString().split('\n').forEach((line) => {
          i += 1;
          if (line) {
            event.push(line);
          }
        });
        Promise.mapSeries(event, (e) => {
          const eve = JSON.parse(e);
          if (eve.request.method == 'DELETE') {
            return chai.request(server)
              .delete(eve.request.url)
              .then(res => res).catch(err => err);
          }
          if (eve.request.method == 'GET') {
            return chai.request(server)
              .get(eve.request.url)
              .then(res => res).catch(err => err);
          }
          if (eve.request.method == 'POST') {
            return chai.request(server)
              .post(eve.request.url)
              .set(eve.request.headers)
              .send(eve.request.body)
              .then(res => res)
              .catch(err => err);
          }
          if (eve.request.method == 'PUT') {
            return chai.request(server)
								   .put(eve.request.url)
								   .set(eve.request.headers)
								   .send(eve.request.body)
								   .then(res => res)
              .catch(err => err);
          }
        }).then((results) => {
          for (let j = 0; j < results.length; j++) {
            const e = JSON.parse(event[j]);
            if (e.request.method == 'GET') {
              results[j].should.have.status(e.response.status_code);
              const ar1 = results[j].body;
              const ar2 = e.response.body;
              if (e.response.status_code == 404) {
                continue;
              }
              expect(ar2.length).to.equal(ar1.length);
              console.log('this request', e);
              console.log('this url', e.request.url);
              for (let k = 0; k < ar1.length; k++) {
                expect(ar2[k]).to.deep.equal(ar1[k]);
              }
            }
            if (e.request.method == 'POST') {
              console.log(e);
              console.log(e.request.url);
              expect(results[j].status).to.equal(e.response.status_code);
            }
            if (e.request.method == 'DELETE') {
              console.log(e);
              console.log(e.request.url);
              expect(results[j].status).to.equal(e.response.status_code);
            }
            if (e.request.method == 'PUT') {
              console.log(e);
              console.log(e.request.url);
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
  });
});
