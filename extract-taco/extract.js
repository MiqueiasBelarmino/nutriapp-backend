import fs from 'fs';
import pdf from 'pdf-parse';
import { stringify } from 'csv-stringify/sync';

const BUFFER = fs.readFileSync('./taco.pdf');

const normalizeNumber = (value) => {
  if (!value || value === 'NA') return null;
  if (value === 'Tr') return 0;
  return Number(value.replace(',', '.'));
};

const extract = async () => {
  const data = await pdf(BUFFER);
  const lines = data.text.split('\n');

  const foods = [];

  for (const line of lines) {
    /**
     * Exemplo típico da TACO (simplificado):
     * "Arroz, branco, cru 358 77,5 7,2 0,3 1,6 1"
     */
    const match = line.match(
      /^(.+?)\s+(\d+)\s+([\d,TrNA]+)\s+([\d,TrNA]+)\s+([\d,TrNA]+)\s+([\d,TrNA]+)\s+([\d,TrNA]+)$/
    );

    if (!match) continue;

    const [
      ,
      alimento,
      energia,
      carbo,
      proteina,
      gordura,
      fibra,
      sodio
    ] = match;

    foods.push({
      alimento: alimento.trim(),
      energia_kcal: normalizeNumber(energia),
      carboidratos_g: normalizeNumber(carbo),
      proteinas_g: normalizeNumber(proteina),
      gorduras_g: normalizeNumber(gordura),
      fibras_g: normalizeNumber(fibra),
      sodio_mg: normalizeNumber(sodio),
    });
  }

  // Remove duplicações por nome
  const uniqueFoods = Array.from(
    new Map(foods.map(f => [f.alimento, f])).values()
  );

  const csv = stringify(uniqueFoods, {
    header: true,
    columns: [
      'alimento',
      'energia_kcal',
      'carboidratos_g',
      'proteinas_g',
      'gorduras_g',
      'fibras_g',
      'sodio_mg',
    ],
  });

  fs.writeFileSync('alimentos-taco.csv', csv, 'utf8');

  console.log(`✔ CSV gerado com ${uniqueFoods.length} alimentos`);
};

extract();
