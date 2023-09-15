import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { tokenization } from '../app/handler';
import * as booksMock from './tokens.mock';
import { Tokens as TokensModel } from '../app/model/entities/token.entity';
import sinon from 'sinon';

describe('tokenization [POST]', () => {
  it('success', () => {
    const s = sinon
      .mock(TokensModel);

    s.expects('create').resolves(booksMock.create);

    return lambdaTester(tokenization)
      .event(booksMock.create)
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(TokensModel);

    s.expects('create').rejects(booksMock.tokenError);

    return lambdaTester(tokenization)
      .event({ body: JSON.stringify(booksMock.create) })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});
