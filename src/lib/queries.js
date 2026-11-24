// O conteúdo vem da API da cartilha (api/server.mjs), que guarda o resultado da consulta
// ao Sanity em cache e o renova assim que o webhook de publicação é chamado. O ETag
// identifica a versão: o navegador revalida com If-None-Match e, sem mudança, o servidor
// responde 304 sem corpo.
export async function fetchContent() {
  const res = await fetch('/api/content');
  if (!res.ok) throw new Error(`Não foi possível carregar o conteúdo (${res.status}).`);
  return { versao: res.headers.get('ETag'), dados: await res.json() };
}
