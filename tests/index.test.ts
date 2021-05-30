import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import httpStatus from 'http-status';
import server from '../src/server';

chai.use(chaiHttp);

describe('General API Health', () => {
    /*
     * Test the /GET Check OK status
     */

    describe('/GET Check OK status', () => {
        it('it should return OK', (done) => {
            chai.request(server)
                .get('/api/v1/status')
                .end((err, res) => {
                    expect(res).to.have.status(httpStatus.OK);
                    expect(res.body).to.eql({
                        code: httpStatus.OK,
                        message: 'OK',
                    });
                    done();
                });
        });
    });

    /*
     * Test the /GET Not found
     */
    describe('/GET Not found', () => {
        it('it should return not found', (done) => {
            chai.request(server)
                .get('/foo')
                .end((err, res) => {
                    expect(res).to.have.status(httpStatus.NOT_FOUND);
                    expect(res.body).to.eql({
                        code: httpStatus.NOT_FOUND,
                        message: 'Not Found',
                    });
                    done();
                });
        });
    });
});
