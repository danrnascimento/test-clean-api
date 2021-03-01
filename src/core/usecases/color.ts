import Color from '../entities/color';
import { v4 } from 'uuid';

type ColorInput = Pick<Color, 'name' | 'value'>;

export default class ColorCases {
  public static createColor({ name, value }: ColorInput): Color {
    return {
      id: v4(),
      name,
      value,
    };
  }
}
