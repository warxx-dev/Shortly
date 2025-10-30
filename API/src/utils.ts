export function generateCode(longitud = 10): string {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }

  return codigo;
}
