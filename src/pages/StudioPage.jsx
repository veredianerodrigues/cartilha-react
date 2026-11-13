import { Studio } from 'sanity';
import config from '../studio/config.ts';

export default function StudioPage() {
  return <Studio config={config} />;
}
