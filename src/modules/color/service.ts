import { Color } from '../color';
import { v4 } from 'uuid';

type ColorInput = Pick<Color, 'name' | 'value'>;

export class ColorService {
  public static createColor({ name, value }: ColorInput): Color {
    return {
      id: v4(),
      name,
      value,
    };
  }
}
