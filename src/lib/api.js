const BASE = '/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || `Erro na requisição (${res.status}).`);
  }
  return data;
}

export const api = {
  getSectionsTree: () => request('/sections'),
  getSection: (slug) => request(`/sections/${slug}`),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),

  updateSection: (token, id, patch) =>
    request(`/admin/sections/${id}`, { method: 'PUT', body: patch, token }),
  createBlock: (token, sectionId, block) =>
    request(`/admin/sections/${sectionId}/blocks`, { method: 'POST', body: block, token }),
  updateBlock: (token, sectionId, blockId, patch) =>
    request(`/admin/sections/${sectionId}/blocks/${blockId}`, { method: 'PUT', body: patch, token }),
  deleteBlock: (token, sectionId, blockId) =>
    request(`/admin/sections/${sectionId}/blocks/${blockId}`, { method: 'DELETE', token }),
  reorderBlocks: (token, sectionId, order) =>
    request(`/admin/sections/${sectionId}/blocks/reorder`, { method: 'PUT', body: { order }, token }),

  async uploadImage(token, file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${BASE}/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || 'Falha ao enviar imagem.');
    return data;
  },
};
