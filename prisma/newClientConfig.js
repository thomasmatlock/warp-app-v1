< ref * 1 > PrismaClient {
    _middlewares: Middlewares {
        query: MiddlewareHandler { _middlewares: [] },
        engine: MiddlewareHandler { _middlewares: [] }
    },
    _transactionId: 1,
    _getDmmf: [Function(anonymous)],
    _previewFeatures: ['referentialIntegrity'],
    _rejectOnNotFound: undefined,
    _clientVersion: '4.3.1',
    _activeProvider: 'mysql',
    _dataProxy: false,
    _tracingConfig: { enabled: [Getter], middleware: [Getter] },
    _clientEngineType: 'library',
    _errorFormat: 'colorless',
    _baseDmmf: {
        datamodel: { enums: [], models: [Array], types: [] },
        datamodelEnumMap: {},
        modelMap: { User: [Object], Machine: [Object] },
        typeMap: {},
        typeAndModelMap: { User: [Object], Machine: [Object] },
        mappings: { modelOperations: [Array], otherOperations: [Object] },
        mappingsMap: { User: [Object], Machine: [Object] }
    },
    _engineConfig: {
        cwd: 'C:\\Users\\Tommy\\Documents\\GitHub\\warp-app\\prisma',
        dirname: 'C:\\Users\\Tommy\\Documents\\GitHub\\warp-app\\node_modules\\.prisma\\client',
        enableDebugLogs: false,
        allowTriggerPanic: undefined,
        datamodelPath: 'C:\\Users\\Tommy\\Documents\\GitHub\\warp-app\\node_modules\\.prisma\\client\\schema.prisma',
        prismaPath: undefined,
        engineEndpoint: undefined,
        datasources: [],
        generator: {
            name: 'client',
            provider: [Object],
            output: [Object],
            config: [Object],
            binaryTargets: [],
            previewFeatures: [Array]
        },
        showColors: false,
        logLevel: undefined,
        logQueries: undefined,
        env: {},
        flags: [],
        clientVersion: '4.3.1',
        previewFeatures: ['referentialIntegrity'],
        activeProvider: 'mysql',
        inlineSchema: undefined,
        inlineDatasources: undefined,
        inlineSchemaHash: undefined,
        tracingConfig: { enabled: [Getter], middleware: [Getter] }
    },
    _engine: LibraryEngine {
        datamodel: 'datasource db {\n' +
            '  provider             = "mysql"\n' +
            '  url                  = "mysql://zu70b6m528ul62n1czgb:pscale_pw_iG3hlQ22IiXHLFoi2tKLqgR4tGzU4xC1cQnr0B1EoaA@us-east.connect.psdb.cloud/warp-app-backend?sslaccept=strict"\n' +
            '  referentialIntegrity = "prisma"\n' +
            '}\n' +
            '\n' +
            'generator client {\n' +
            '  provider        = "prisma-client-js"\n' +
            '  previewFeatures = ["referentialIntegrity"]\n' +
            '}\n' +
            '\n' +
            'model User {\n' +
            '  id                   String    @id @default(uuid())\n' +
            '  email                String?\n' +
            '  machines             Machine[]\n' +
            '  audio                String    @default("free")\n' +
            '  video                String    @default("free")\n' +
            '  warpstagram          String    @default("free")\n' +
            '  isEULAaccepted       Boolean   @default(false)\n' +
            '  audioDownloadsCount  Int       @default(0)\n' +
            '  videoDownloadsCount  Int       @default(0)\n' +
            '  warpstagramDownloads Int       @default(0)\n' +
            '  audioAuthCode        String    @default("")\n' +
            '  videoAuthCode        String    @default("")\n' +
            '  warpstagramAuthCode  String    @default("")\n' +
            '  createdAt            DateTime  @default(now())\n' +
            '  updatedAt            DateTime  @updatedAt\n' +
            '}\n' +
            '\n' +
            'model Machine {\n' +
            '  id        String   @id @default(uuid())\n' +
            '  hostname  String\n' +
            '  platform  String\n' +
            '  type      String\n' +
            '  release   String\n' +
            '  user      User     @relation(fields: [userId], references: [id])\n' +
            '  userId    String\n' +
            '  createdAt DateTime @default(now())\n' +
            '  updatedAt DateTime @updatedAt\n' +
            '}\n',
        config: {
            cwd: 'C:\\Users\\Tommy\\Documents\\GitHub\\warp-app\\prisma',
            dirname: 'C:\\Users\\Tommy\\Documents\\GitHub\\warp-app\\node_modules\\.prisma\\client',
            enableDebugLogs: false,
            allowTriggerPanic: undefined,
            datamodelPath: 'C:\\Users\\Tommy\\Documents\\GitHub\\warp-app\\node_modules\\.prisma\\client\\schema.prisma',
            prismaPath: undefined,
            engineEndpoint: undefined,
            datasources: [],
            generator: [Object],
            showColors: false,
            logLevel: undefined,
            logQueries: undefined,
            env: {},
            flags: [],
            clientVersion: '4.3.1',
            previewFeatures: [Array],
            activeProvider: 'mysql',
            inlineSchema: undefined,
            inlineDatasources: undefined,
            inlineSchemaHash: undefined,
            tracingConfig: [Object]
        },
        libraryStarted: false,
        logQueries: false,
        logLevel: 'error',
        libraryLoader: DefaultLibraryLoader {
            libQueryEnginePath: null,
            platform: null,
            config: [Object]
        },
        logEmitter: EventEmitter {
            _events: [Object: null prototype],
            _eventsCount: 1,
            _maxListeners: undefined,
            [Symbol(kCapture)]: false
        },
        datasourceOverrides: [Object: null prototype] {},
        libraryInstantiationPromise: Promise { < pending > }
    },
    _fetcher: RequestHandler {
        client: [Circular * 1],
        hooks: undefined,
        dataloader: DataLoader { options: [Object], tickActive: false, batches: {} }
    },
    _metrics: MetricsClient {
        _engine: LibraryEngine {
            datamodel: 'datasource db {\n' +
                '  provider             = "mysql"\n' +
                '  url                  = "mysql://zu70b6m528ul62n1czgb:pscale_pw_iG3hlQ22IiXHLFoi2tKLqgR4tGzU4xC1cQnr0B1EoaA@us-east.connect.psdb.cloud/warp-app-backend?sslaccept=strict"\n' +
                '  referentialIntegrity = "prisma"\n' +
                '}\n' +
                '\n' +
                'generator client {\n' +
                '  provider        = "prisma-client-js"\n' +
                '  previewFeatures = ["referentialIntegrity"]\n' +
                '}\n' +
                '\n' +
                'model User {\n' +
                '  id                   String    @id @default(uuid())\n' +
                '  email                String?\n' +
                '  machines             Machine[]\n' +
                '  audio                String    @default("free")\n' +
                '  video                String    @default("free")\n' +
                '  warpstagram          String    @default("free")\n' +
                '  isEULAaccepted       Boolean   @default(false)\n' +
                '  audioDownloadsCount  Int       @default(0)\n' +
                '  videoDownloadsCount  Int       @default(0)\n' +
                '  warpstagramDownloads Int       @default(0)\n' +
                '  audioAuthCode        String    @default("")\n' +
                '  videoAuthCode        String    @default("")\n' +
                '  warpstagramAuthCode  String    @default("")\n' +
                '  createdAt            DateTime  @default(now())\n' +
                '  updatedAt            DateTime  @updatedAt\n' +
                '}\n' +
                '\n' +
                'model Machine {\n' +
                '  id        String   @id @default(uuid())\n' +
                '  hostname  String\n' +
                '  platform  String\n' +
                '  type      String\n' +
                '  release   String\n' +
                '  user      User     @relation(fields: [userId], references: [id])\n' +
                '  userId    String\n' +
                '  createdAt DateTime @default(now())\n' +
                '  updatedAt DateTime @updatedAt\n' +
                '}\n',
            config: [Object],
            libraryStarted: false,
            logQueries: false,
            logLevel: 'error',
            libraryLoader: [DefaultLibraryLoader],
            logEmitter: [EventEmitter],
            datasourceOverrides: [Object: null prototype] {},
            libraryInstantiationPromise: [Promise]
        }
    }
}