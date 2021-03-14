import { Request, Response } from 'express';
import { ColorInput, ColorService } from './service';

const mockedColor = ColorService.createColor({
  name: 'Default',
  value: '#FFF',
});

export class ColorController {
  public createColor(req: Request, res: Response) {
    const { name, value } = req.body as ColorInput;

    if (!name || !value) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const color = ColorService.createColor({
      name,
      value,
    });

    return res.status(200).json(color);
  }

  public getColorById(req: Request, res: Response) {
    const { colorId } = req.params;

    if (!colorId) {
      return res.status(400).json({ error: 'missing id' });
    }

    res.status(200).json({ data: mockedColor });
  }

  public updateColor(req: Request, res: Response) {
    const { colorId } = req.params;
    const { name, value } = req.body as ColorInput;

    if (!colorId) {
      return res.status(400).json({ error: 'missing id' });
    }

    if (!name || !value) {
      return res.status(400).json({ error: 'missing properties' });
    }

    res.status(200).json({ data: mockedColor });
  }
}
