const fs = require('fs');
const csv = require('csv-parser');

const results = [];

// Função para limpar e converter os valores para Float
const parseValue = (val) => {
  if (!val || val === 'NA' || val === '*') return null;
  if (val === 'TR') return 0.0;
  
  // Substitui vírgula por ponto para o padrão Float do JS
  const cleanVal = val.replace(',', '.');
  return parseFloat(cleanVal);
};

fs.createReadStream('alimentos.csv') // O arquivo CSV que você baixou
  .pipe(csv({ separator: ';' })) // Geralmente o CSV da TACO usa ponto e vírgula
  .on('data', (data) => {
    // Mapeamento exato baseado nas colunas padrão da TACO
    const food = {
      name: data['Descrição dos alimentos'],
      calories: parseValue(data['Energia (kcal)']),
      protein: parseValue(data['Proteína (g)']),
      carbs: parseValue(data['Carboidrato (g)']),
      fats: parseValue(data['Lipídeos (g)']),
      fiber: parseValue(data['Fibra Alimentar (g)']),
      sodium: parseValue(data['Sódio (mg)'])
    };
    results.push(food);
  })
  .on('end', () => {
    // Salva o resultado final em um arquivo JSON
    fs.writeFileSync('taco_formatado.json', JSON.stringify(results, null, 2));
    console.log('Conversão concluída! Arquivo taco_formatado.json gerado.');
  });