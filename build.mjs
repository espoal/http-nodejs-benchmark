import { buildHelper } from '@libs/build'

buildHelper({
    name: 'http2-node',
    entryPoints: ['svcs/http2-node/index.mts'],
    outDir: 'http2-node/src',
    external: [],
})

buildHelper({
    name: 'http-node',
    entryPoints: ['svcs/http-node/index.mts'],
    outDir: 'http-node/src',
    external: [],
})

buildHelper({
    name: 'http-express',
    entryPoints: ['svcs/http-express/index.mts'],
    outDir: 'http-express/src',
    external: ['express'],
})

buildHelper({
  name: 'http-bun',
  entryPoints: ['svcs/http-bun/server.mts'],
  outDir: 'http-bun/src',
  external: [],
})

buildHelper({
  name: 'http-deno',
  entryPoints: ['svcs/http-deno/index.mts'],
  outDir: 'http-deno/src',
  external: [],
})

buildHelper({
  name: 'unix-socket',
  entryPoints: ['svcs/unix-socket/index.mts'],
  outDir: 'unix-socket/src',
  external: [],
})
