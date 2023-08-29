import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { mockTeams, mockTeam } from './mocks/mockTeams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota Teams', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('testando se é possivel listar todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(mockTeams as []);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
  });

  it('testando se é possivel listar um time pelo id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(mockTeam as any);

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
  });
});
