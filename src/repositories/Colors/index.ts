import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { ColorModel } from '../../models/Color';

@EntityRepository(ColorModel)
export class ColorRepository extends Repository<ColorModel> {}

export default () => getCustomRepository(ColorRepository);
