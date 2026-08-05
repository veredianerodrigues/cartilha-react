CREATE TABLE IF NOT EXISTS sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER REFERENCES sections(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER NOT NULL,
  page_label TEXT,
  title TEXT NOT NULL,
  is_front_matter INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('heading', 'paragraph', 'callout', 'quote_grid', 'list', 'image')),
  heading TEXT,
  body TEXT,
  items_json TEXT,
  image_url TEXT,
  image_caption TEXT
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sections_parent ON sections(parent_id);
CREATE INDEX IF NOT EXISTS idx_blocks_section ON blocks(section_id);
