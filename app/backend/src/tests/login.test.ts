import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import mockToken from './mocks/mockToken';
import mockUser from './mocks/mockUser';
import createToken from '../utils/createToken';
import User from '../Interfaces/Users/User';
import tokenVerify from '../middlewares/tokenVerify';
import LoginVerify from '../middlewares/loginVerify';
import autJwt from '../utils/auth.jwt';

import { Response } from 'superagent';
import { verify } from 'crypto';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('testando se é possivel logar', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser as any);
    sinon.stub(createToken, 'generateToken').returns(mockToken);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(response.status).to.be.equal(200);

  });

  it('testando se é possivel logar com email inválido', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser as any);

    const response = await chai.request(app).post('/login').send({
      email: 'adminadmin.com',
      password: 'secret_admin',
    });

    expect(response.status).to.be.equal(401);
  });

  it('testando se é possivel logar com senha inválida', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser as any);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secreadmin',
    });

    expect(response.status).to.be.equal(401);
  });
  
  it('testando se é possivel logar com senha menor que 6 caracteres', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser as any);
    sinon.stub(LoginVerify, 'verifyPassword').returns({} as any);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secr',
    });

    expect(response.status).to.be.equal(401);
  });

  it('testando se é possivel logar sem senha', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser as any);
    sinon.stub(LoginVerify, 'verifyPassword').returns({} as any);

    const response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });

    expect(response.status).to.be.equal(400);
  });


  it('testando se é possivel logar sem email', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser as any);
    sinon.stub(LoginVerify, 'verifyPassword').returns({} as any);

    const response = await chai.request(app).post('/login').send({
      email: '',
      password: 'secret_admin',
    });

    expect(response.status).to.be.equal(400);
  });

});
