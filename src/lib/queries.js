// O conteúdo vem da API da cartilha (api/server.mjs), que guarda o resultado da consulta
// ao Sanity em cache e o renova assim que o webhook de publicação é chamado.
export async function fetchContent() {
  const res = await fetch('/api/content');
  if (!res.ok) throw new Error(`Não foi possível carregar o conteúdo (${res.status}).`);
  return res.json();
}
