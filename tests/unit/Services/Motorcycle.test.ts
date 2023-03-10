import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/Motorcycles.service';

describe('Testes das rotas de /motorcycles', function () {
  it('Testa se cria uma moto com sucesso', async function () {
    const inputMotorcycle: IMotorcycle = {
      model: 'kawasaki Ninja',
      year: 2010,
      color: 'Blue',
      status: true,
      buyValue: 60.000,
      category: 'Street',
      engineCapacity: 700,
    };

    const resultMotorcycle: IMotorcycle = {
      id: '640aa9ff5587c2e184b469df',
      model: 'kawasaki Ninja',
      year: 2010,
      color: 'Blue',
      status: true,
      buyValue: 60.000,
      category: 'Street',
      engineCapacity: 700,
    };

    sinon.stub(Model, 'create').resolves(resultMotorcycle);

    const service = new MotorcycleService();
    const create = await service.createMotorcycle(inputMotorcycle);

    expect(create).to.be.deep.equal(resultMotorcycle);

    sinon.restore();
  });

  it('Testa se consegue retornar todas as motos', async function () {
    const AllMotorcycles: IMotorcycle[] = [
      {
        id: '640a15f56098ad692e5c7249',
        model: 'CBR 1100',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 30.000,
        category: 'Custom',
        engineCapacity: 600,
      },
      {
        id: '520a15f59048ad692e5c6435',
        model: 'Honda Cb 600f Hornet',
        year: 2010,
        color: 'Vermelha',
        status: true,
        buyValue: 40.000,
        category: 'Street',
        engineCapacity: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(AllMotorcycles);

    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();

    expect(result).to.be.deep.equal(AllMotorcycles);

    sinon.restore();
  });

  it('Testa se consegue buscar uma moto pelo id', async function () {
    const oneMotorcycle: IMotorcycle = {
      id: '520a15f59048ad692e5c6435',
      model: 'Honda XRE 300',
      year: 2010,
      color: 'Vermelha',
      status: true,
      buyValue: 40.000,
      category: 'Street',
      engineCapacity: 5,
    };

    sinon.stub(Model, 'findById').resolves(oneMotorcycle);

    const service = new MotorcycleService();
    const result = await service.getOneMotorcycle('640a15f56098ad692e5c7249');

    expect(result).to.be.deep.equal(oneMotorcycle);

    sinon.restore();
  });

  it('Testa se ao buscar por um id invalido retorna o erro esperado', async function () {
    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new MotorcycleService();
      await service.getOneMotorcycle('640a15f56098ad692e5c7249');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }

    sinon.restore();
  });

  it('Testa se atualiza uma Moto com sucesso', async function () {
    const inputMotorcycle: IMotorcycle = {
      id: '520a15f59048ad692e5c6435',
      model: 'Yamaha MT-09',
      year: 2010,
      color: 'Vermelha',
      status: true,
      buyValue: 35.000,
      category: 'Custom',
      engineCapacity: 550,
    };

    const resultMotorcycle: IMotorcycle = {
      id: '520a15f59048ad692e5c6435',
      model: 'Yamaha MT-09',
      year: 2010,
      color: 'Vermelha',
      status: true,
      buyValue: 40.000,
      category: 'Street',
      engineCapacity: 5,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(resultMotorcycle);

    const service = new MotorcycleService();
    const update = await service.updateMotorcycle('640a15f56098ad692e5c7249', inputMotorcycle);

    expect(update).to.be.deep.equal(resultMotorcycle);

    sinon.restore();
  });

  it('Testa se retorna um erro ao tentar atualizar uma moto com o id errado', async function () {
    const inputCar: IMotorcycle = {
      model: 'Ducati Diavel',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      category: 'Street',
      engineCapacity: 500,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    try {
      const service = new MotorcycleService();
      await service.updateMotorcycle('640a15f56098ad692e5c7249', inputCar);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }

    sinon.restore();
  });
});