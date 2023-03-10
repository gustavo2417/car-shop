import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/Car.service';

describe('Testes das rotas de /car', function () {
  it('Testa se cria um carro com sucesso', async function () {
    const inputCar: ICar = {
      model: 'Golf gti',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const resultCar: ICar = {
      id: '640a15f56098ad692e5c7249',
      model: 'Golf gti',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'create').resolves(resultCar);

    const service = new CarService();
    const create = await service.createCar(inputCar);

    expect(create).to.be.deep.equal(resultCar);

    sinon.restore();
  });

  it('Testa se consegue retornar todos os carros', async function () {
    const AllCars: ICar[] = [
      {
        id: '640a15f56098ad692e5c7249',
        model: 'Golf gti',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.000,
        doorsQty: 2,
        seatsQty: 5,
      },
      {
        id: '520a15f59048ad692e5c6435',
        model: 'Fusca',
        year: 1990,
        color: 'Azul',
        status: true,
        buyValue: 7.000,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(AllCars);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(AllCars);

    sinon.restore();
  });

  it('Testa se consegue buscar um carro por id', async function () {
    const oneCar: ICar = {
      id: '640a15f56098ad692e5c7249',
      model: 'Golf gti',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(oneCar);

    const service = new CarService();
    const result = await service.getOneCar('640a15f56098ad692e5c7249');

    expect(result).to.be.deep.equal(oneCar);

    sinon.restore();
  });

  it('Testa se ao buscar por um id invalido retorna o erro esperado', async function () {
    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new CarService();
      await service.getOneCar('640a15f56098ad692e5c7249');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }

    sinon.restore();
  });

  it('Testa se atualiza um carro com sucesso', async function () {
    const inputCar: ICar = {
      model: 'Golf gti',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const resultCar: ICar = {
      id: '640a15f56098ad692e5c7249',
      model: 'Golf gti',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(resultCar);

    const service = new CarService();
    const update = await service.updateCar('640a15f56098ad692e5c7249', inputCar);

    expect(update).to.be.deep.equal(resultCar);

    sinon.restore();
  });

  it('Testa se retorna um erro ao tentar atualizar um carro com o id errado', async function () {
    const inputCar: ICar = {
      model: 'Golf gti',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    try {
      const service = new CarService();
      await service.updateCar('640a15f56098ad692e5c7249', inputCar);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }

    sinon.restore();
  });
});