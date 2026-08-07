import { createClient } from '@supabase/supabase-js';

// Client server-side only — precisa da service_role key (ignora RLS) pra
// gravar no bucket. SUPABASE_SERVICE_ROLE_KEY é o nome preferido (setado à
// mão); SUPABASE_API_KEY é o nome que a integração automática da Hostinger
// injeta ao conectar o Supabase pelo hPanel — mantido como fallback, mas se
// os uploads começarem a falhar por permissão é sinal de que essa variável
// veio com a chave `anon` em vez da `service_role`. Nunca importar este
// módulo (ou expor essa key) em código que rode no navegador.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_API_KEY
);

const BUCKET = 'uploads';

// Sobe um buffer pro bucket público "uploads" e devolve a URL pública.
// upsert:true faz o mesmo path sobrescrever se já existir.
export async function uploadToStorage(objectPath, buffer, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buffer, {
    contentType,
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}
