import yaml from 'yaml';

import StyleDictionary from 'style-dictionary';
import type { Parser } from 'style-dictionary/types';

// --- Register Parser ---

const yamlParser: Parser = {
  name: 'yaml-parser',
  pattern: /\.yaml$/,
  parser: ({ contents }) => yaml.parse(contents),
};
StyleDictionary.registerParser(yamlParser);

// --- Config ---

const sd = new StyleDictionary({
  parsers: ['yaml-parser'],
  source: ['tokens.yaml'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['size/px'],
      files: [
        {
          destination: 'build/variables.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
  },
});

// --- Build ---

await sd.hasInitialized;

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
