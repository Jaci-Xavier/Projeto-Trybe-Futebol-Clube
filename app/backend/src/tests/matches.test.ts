import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

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

  it('testando se é possivel criar uma partida', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(Match, 'create').resolves({} as any);

    const response = await chai.request(app).post('/matches').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
    .send({
      homeTeamId: 1,
      awayTeamId: 3,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });
    expect(response.status).to.be.equal(201);
  });

  it('testando se é possivel atualizar uma partida', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(Match, 'update').resolves({} as any);

    const response = await chai.request(app).patch('/matches/1').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
    .send({
      homeTeamId: 1,
      awayTeamId: 3,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });
    expect(response.status).to.be.equal(200);
  });

  it('testando se é possivel finalizar uma partida', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(Match, 'update').resolves({} as any);

    const response = await chai.request(app).patch('/matches/44/finish').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
    .send({
      homeTeamId: 7,
      awayTeamId: 15,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: false,
    });
    expect(response.status).to.be.equal(200);
  });

  it('testando se é possivel criar uma partida com dois times iguais', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(Match, 'create').resolves({} as any);

    const response = await chai.request(app).post('/matches').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
    .send({
      homeTeamId: 3,
      awayTeamId: 3,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });
    expect(response.status).to.be.equal(422);
  });

  it('testando se é possivel criar uma partida sem times', async () => {
    sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
    sinon.stub(Match, 'create').resolves({} as any);

    const response = await chai.request(app).post('/matches').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
    .send({
      awayTeamId: 3,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });
    expect(response.status).to.be.equal(404);
  });

});
