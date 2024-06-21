import webpack from 'webpack'
import path from "path" // импорт необходим чтобы конфигурация принимала новое поле devserver
import {buildWebpack} from "./config/build/buildWebpack"
import {BuildMode, BuildPaths, BuildPlatformMode} from "./config/build/types/types"

interface EnvVariables {
    mode: BuildMode
    port: number
    analyzer?: boolean
    platform?: BuildPlatformMode
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry:  path.resolve(__dirname, 'src', 'index.ts'), // dirname содержит в себе абсолютный путь до текущего файла,
        // далее пошагово мы идем к entry point один шаг равный имени файла или папки - 1 аргумент
        // entry point это корневой файл js который уже ссылается на остальные файлы приложения
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }
    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? "development",
        platform: env.platform ?? "desktop",
        analyzer: env.analyzer,
        paths,
    })
    return config
}
