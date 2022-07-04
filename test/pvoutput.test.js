const expect = require('chai').expect;
const nock = require('nock');
const querystring = require('querystring');
const fs = require('fs');

const mockSettings = {
    apiKey: 'apikey',
    systemId: 1234,
};

const PVOutputClass = require('../pvoutput.js');
const pvoutput = new PVOutputClass(mockSettings);

const pvoutput_sunny_response = fs.readFileSync(
    'test/response.pvoutput.sunny',
    'utf8'
);
const pvoutput_cloudy_response = fs.readFileSync(
    'test/response.pvoutput.cloudy',
    'utf8'
);
const pvoutput_notime_response = fs.readFileSync(
    'test/response.pvoutput.notime',
    'utf8'
);
const pvoutput_output_response = fs.readFileSync(
    'test/response.pvoutput.output',
    'utf8'
);

describe('pvoutput tests', () => {
    it('Should add a status', (done) => {
        const pvoutputdatamock = {
            datetime: '2022-07-02 19:29:00',
            energyGeneration: 10000,
            powerGeneration: 2000,
            energyConsumption: 10000,
            powerConsumption: 2000,
            temperature: 23.4,
            voltage: 210.7,
        };
        nock('http://pvoutput.org')
            .get(
                '/service/r2/addstatus.jsp?key=apikey&sid=1234&d=20220702&t=19%3A29&v1=10000&v2=2000&v3=10000&v4=2000&v5=23.4&v6=210.7'
            )
            .reply(200);

        pvoutput
            .addStatus(pvoutputdatamock)
            .then((response) => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });
    it('Should retrieve the last status when weather is sunny', (done) => {
        nock('http://pvoutput.org')
            .get('/service/r2/getstatus.jsp')
            .query({
                key: 'apikey',
                sid: 1234,
            })
            .reply(200, pvoutput_sunny_response);
        pvoutput.getStatus().then((response) => {
            expect(response.energyGeneration).to.be.a('number');
            done();
        });
    });
    it('Should retrieve the last status when weather is cloudy', (done) => {
        nock('http://pvoutput.org')
            .get('/service/r2/getstatus.jsp')
            .query({
                key: 'apikey',
                sid: 1234,
            })
            .reply(200, pvoutput_cloudy_response);
        pvoutput.getStatus().then((response) => {
            expect(response.energyGeneration).to.be.a('number');
            done();
        });
    });

    it('Should be able to retrieve the last day outputs', (done) => {
        nock('http://pvoutput.org')
            .get('/service/r2/getoutput.jsp')
            .query({
                key: 'apikey',
                sid: 1234,
            })
            .reply(200, pvoutput_output_response);
        pvoutput.getOutput().then((response) => {
            expect(response).to.be.an('array');
            done();
        });
    });
});
