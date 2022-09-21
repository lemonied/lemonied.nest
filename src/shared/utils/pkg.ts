import * as fs from 'fs';
import { resolve } from 'path';

export const pkgInfo = JSON.parse(
  fs.readFileSync(
    resolve(process.cwd(), './package.json'),
    { encoding: 'utf-8' },
  )
);
