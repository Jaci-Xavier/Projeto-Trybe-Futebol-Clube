import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/MatchModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota matches', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('testando se é possivel listar todas as partidas', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
  });

  it('testando se é possivel listar as partidas em progresso', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
  });

  it('testando se é possivel listar as partidas finalizadas', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
  });

});
