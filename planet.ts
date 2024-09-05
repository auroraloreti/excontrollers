import { Request, Response } from 'express';
import Joi from 'joi';


let planets = [
  { id: 1, name: 'Earth' },
  { id: 2, name: 'Mars' },
];


const planetSchema = Joi.object({
  name: Joi.string().min(3).required(),
});


export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: 'Planet not found' });
  res.status(200).json(planet);
};

export const create = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: 'Planet created successfully' });
};

export const updateById = (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planets = planets.map(p =>
    p.id === parseInt(req.params.id) ? { ...p, name: req.body.name } : p
  );

  const updatedPlanet = planets.find(p => p.id === parseInt(req.params.id));
  if (!updatedPlanet) return res.status(404).json({ msg: 'Planet not found' });

  res.status(200).json({ msg: 'Planet updated successfully' });
};

export const deleteById = (req: Request, res: Response) => {
  const planetIndex = planets.findIndex(p => p.id === parseInt(req.params.id));
  if (planetIndex === -1) return res.status(404).json({ msg: 'Planet not found' });

  planets = planets.filter(p => p.id !== parseInt(req.params.id));
  res.status(200).json({ msg: 'Planet deleted successfully' });
};