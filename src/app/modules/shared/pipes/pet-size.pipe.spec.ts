import { PetSizePipe } from './pet-size.pipe';

describe('PetSizePipe', () => {
  it('create an instance', () => {
    const pipe = new PetSizePipe();
    expect(pipe).toBeTruthy();
  });
});
