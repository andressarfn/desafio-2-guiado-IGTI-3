const formatted = Intl.NumberFormat('pt-BR');

function formatNumber(value) {
  return formatted.format(value);
}

export { formatNumber };
