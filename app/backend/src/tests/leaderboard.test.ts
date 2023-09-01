import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/MatchModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota leaderboard', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('testando se é possivel listar o leaderboard', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
  });

  
});