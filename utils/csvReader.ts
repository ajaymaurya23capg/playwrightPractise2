import fs from 'fs';
import path from 'path';

type Row = { [key: string]: string };

export function readCsv(filePath: string): Row[] {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(abs, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const row: Row = {};
    for (let j = 0; j < headers.length; j++) {
      const rawVal = (cols[j] || '').trim();
      // Do not perform timestamp replacement here. Keep raw templating tokens
      // in the returned data so that timestamps can be applied at runtime
      // (during the worker run) which prevents mismatches between test
      // collection and worker execution.
      const val = rawVal;
      row[headers[j]] = val;
    }
    rows.push(row);
  }
  return rows;
}

export default readCsv;
