// Função que formata um número para moeda brasileira (R$)
export const formatCurrency = (value: number): string => {
  // Utiliza o Intl.NumberFormat para formatar no padrão pt-BR
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};