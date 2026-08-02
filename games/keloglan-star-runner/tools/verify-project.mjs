import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scriptsRoot = join(projectRoot, 'assets', 'scripts');
const scenePath = join(projectRoot, 'assets', 'scenes', 'Main.scene');
const bootstrapMetaPath = join(
  scriptsRoot,
  'components',
  'GameBootstrap.ts.meta',
);
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`${relative(projectRoot, path)}: ${error.message}`);
    return null;
  }
}

function collectFiles(directory, suffix) {
  if (!existsSync(directory)) {
    return [];
  }
  return readdirSync(directory)
    .flatMap((entry) => {
      const path = join(directory, entry);
      return statSync(path).isDirectory()
        ? collectFiles(path, suffix)
        : path.endsWith(suffix)
          ? [path]
          : [];
    })
    .sort();
}

function compressUuid(uuid) {
  const normalized = uuid.replaceAll('-', '');
  const keys =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = normalized.slice(0, 5);
  for (let index = 5; index < normalized.length; index += 3) {
    const value = Number.parseInt(normalized.slice(index, index + 3), 16);
    result += keys[value >> 6] + keys[value & 63];
  }
  return result;
}

function verifyProjectShape() {
  const packageJson = readJson(join(projectRoot, 'package.json'));
  if (!packageJson) {
    return;
  }
  if (!/^3\.8\./.test(packageJson.creator?.version ?? '')) {
    fail('package.json must target Cocos Creator 3.8.x.');
  }
  if (packageJson.dependencies || packageJson.devDependencies) {
    fail('The game must not declare third-party runtime or development packages.');
  }

  for (const required of [
    'ARCHITECTURE.md',
    'README.md',
    'assets/scenes/Main.scene',
    'assets/scripts/components/GameBootstrap.ts',
    'assets/scripts/components/GameController.ts',
    'assets/scripts/components/InputController.ts',
    'assets/scripts/components/RunnerController.ts',
    'assets/scripts/presentation/GameArtLoader.ts',
    'assets/scripts/world/SpawnManager.ts',
    'assets/resources/art/anatolian-star.png',
    'assets/resources/art/anatolian-testi.png',
    'assets/resources/art/anatolian-village-background.png',
    'assets/resources/art/keloglan-runner.png',
    'docs/ART_DIRECTION.md',
  ]) {
    if (!existsSync(join(projectRoot, required))) {
      fail(`Required project file missing: ${required}`);
    }
  }

  const architecture = readFileSync(
    join(projectRoot, 'ARCHITECTURE.md'),
    'utf8',
  );
  for (const heading of [
    '## Schichten',
    '## Ordnerstruktur',
    '## Szenen und Komponenten',
    '## Zustandsmodell',
  ]) {
    if (!architecture.includes(heading)) {
      fail(`ARCHITECTURE.md is missing "${heading}".`);
    }
  }
}

function verifyArtAssets() {
  const transparentArt = [
    'assets/resources/art/anatolian-star.png',
    'assets/resources/art/anatolian-testi.png',
    'assets/resources/art/keloglan-runner.png',
  ];
  const allArt = [
    ...transparentArt,
    'assets/resources/art/anatolian-village-background.png',
  ];

  for (const relativePath of allArt) {
    const path = join(projectRoot, relativePath);
    if (!existsSync(path)) {
      continue;
    }
    const png = readFileSync(path);
    const signature = png.subarray(0, 8).toString('hex');
    if (signature !== '89504e470d0a1a0a' || png.length < 26) {
      fail(`${relativePath} is not a valid PNG asset.`);
      continue;
    }
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    if (width < 512 || height < 512) {
      fail(`${relativePath} is unexpectedly small (${width}x${height}).`);
    }
    if (transparentArt.includes(relativePath) && png[25] !== 6) {
      fail(`${relativePath} must use RGBA color for transparent edges.`);
    }
  }
}

function verifyScene() {
  const scene = readJson(scenePath);
  const bootstrapMeta = readJson(bootstrapMetaPath);
  if (!scene || !bootstrapMeta || !Array.isArray(scene)) {
    return;
  }

  if (scene[0]?.__type__ !== 'cc.SceneAsset') {
    fail('Main.scene does not begin with a cc.SceneAsset.');
  }
  if (scene[1]?.__type__ !== 'cc.Scene') {
    fail('Main.scene does not contain a cc.Scene root.');
  }

  const expectedType = compressUuid(bootstrapMeta.uuid);
  if (scene[3]?.__type__ !== expectedType) {
    fail(
      `Main.scene bootstrap type "${scene[3]?.__type__}" does not match ` +
        `"${expectedType}".`,
    );
  }
  if (scene[2]?._name !== 'GameBootstrap' || scene[3]?.node?.__id__ !== 2) {
    fail('Main.scene bootstrap component is not attached to GameBootstrap.');
  }

  const visit = (value) => {
    if (!value || typeof value !== 'object') {
      return;
    }
    if (
      Object.hasOwn(value, '__id__') &&
      (!Number.isInteger(value.__id__) ||
        value.__id__ < 0 ||
        value.__id__ >= scene.length)
    ) {
      fail(`Main.scene contains invalid object reference __id__=${value.__id__}.`);
    }
    for (const child of Object.values(value)) {
      visit(child);
    }
  };
  visit(scene);
}

function verifyMetasAndSyntax() {
  const sourceFiles = collectFiles(scriptsRoot, '.ts');
  const uuids = new Set();

  for (const sourceFile of sourceFiles) {
    const metaPath = `${sourceFile}.meta`;
    if (!existsSync(metaPath)) {
      fail(`${relative(projectRoot, sourceFile)} has no committed .meta file.`);
      continue;
    }
    const meta = readJson(metaPath);
    if (!meta) {
      continue;
    }
    if (
      typeof meta.uuid !== 'string' ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        meta.uuid,
      )
    ) {
      fail(`${relative(projectRoot, metaPath)} has an invalid UUID.`);
    }
    if (uuids.has(meta.uuid)) {
      fail(`Duplicate asset UUID: ${meta.uuid}`);
    }
    uuids.add(meta.uuid);

    const result = ts.transpileModule(readFileSync(sourceFile, 'utf8'), {
      fileName: sourceFile,
      reportDiagnostics: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2021,
        module: ts.ModuleKind.ESNext,
        experimentalDecorators: true,
      },
    });
    for (const diagnostic of result.diagnostics ?? []) {
      fail(
        `${relative(projectRoot, sourceFile)}: ` +
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      );
    }
  }

  if (sourceFiles.length < 10) {
    fail(`Expected at least 10 TypeScript modules, found ${sourceFiles.length}.`);
  }

  const typeProgram = ts.createProgram(
    [
      join(projectRoot, 'tools', 'cc-shim.d.ts'),
      ...sourceFiles,
    ],
    {
      target: ts.ScriptTarget.ES2021,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      strict: true,
      noEmit: true,
      noImplicitOverride: true,
      experimentalDecorators: true,
      skipLibCheck: true,
    },
  );
  for (const diagnostic of ts.getPreEmitDiagnostics(typeProgram)) {
    const location = diagnostic.file
      ? `${relative(projectRoot, diagnostic.file.fileName)}:`
      : '';
    fail(
      `${location}${ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      )}`,
    );
  }
}

function verifyCoreLogic() {
  const temporaryBuild = mkdtempSync(join(tmpdir(), 'keloglan-core-'));
  try {
    const rootNames = [
      join(scriptsRoot, 'config', 'GameConfig.ts'),
      ...collectFiles(join(scriptsRoot, 'core'), '.ts'),
    ];
    const program = ts.createProgram(rootNames, {
      target: ts.ScriptTarget.ES2021,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      rootDir: scriptsRoot,
      outDir: temporaryBuild,
      strict: true,
      noEmitOnError: true,
      skipLibCheck: true,
    });
    const emitResult = program.emit();
    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .concat(emitResult.diagnostics);
    for (const diagnostic of diagnostics) {
      const location = diagnostic.file
        ? `${relative(projectRoot, diagnostic.file.fileName)}:`
        : '';
      fail(
        `${location}${ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          '\n',
        )}`,
      );
    }
    if (diagnostics.length > 0) {
      return;
    }

    const testResult = spawnSync(
      process.execPath,
      [join(projectRoot, 'tests', 'core.test.cjs'), temporaryBuild],
      { encoding: 'utf8' },
    );
    if (testResult.status !== 0) {
      fail(testResult.stderr || testResult.stdout || 'Core tests failed.');
    } else {
      process.stdout.write(testResult.stdout);
    }
  } finally {
    rmSync(temporaryBuild, { recursive: true, force: true });
  }
}

verifyProjectShape();
verifyArtAssets();
verifyScene();
verifyMetasAndSyntax();
verifyCoreLogic();

if (failures.length > 0) {
  console.error(`\nVerification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    'Project verification passed: structure, art assets, scene, TypeScript syntax, metas, and core logic.',
  );
}
