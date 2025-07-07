export function formatMoneyNumber(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatMoney(value: string) {
  let v = value.replace(/\D/g, "");
  const num = Number(v);
  if (!v || num === 0) return "";
  v = (num / 100).toFixed(2) + "";
  v = v.replace(".", ",");
  v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return "R$ " + v;
}
