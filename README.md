# BASE

该示例展示了最基本的项目结构，没有提供额外的功能，可以通过该示例了解整个项目的构建。

## 开始

```bash
# 构建项目
elf init -t wulie88/base base-demo

# 安装依赖
cnpm install # 或者使用 yarn install

# 开发模式
npm start

# 构建
npm run build
```

## 开发

开发时，主要涉及到三个文件

- `src/index.html`

    整个网页的 HTML 文件

- `src/js/main.js`

    Javascript 文件

- `src/css/main.scss`

    样式文件


## 加入了art-template

请在elf项目运行下面命令安装`art-template-loader`, 支持Webpack打包到项目中。

```bash
npm install art-template
npm install art-template-loader --save-dev
```

在Webpack加入如下配置，支持打包`art`文件。

```
module.exports = {
    // ...
    module: {
        rules: [{
            test: /\.jpg$/,
            loader: "file-loader"
        }, {
            test: /\.png$/,
            loader: "url-loader?mimetype=image/png"
        }, {
            test: /\.art$/,
            loader: "art-template-loader",
            options: {
                // art-template options (if necessary)
                // @see https://github.com/aui/art-template
            }
        }]
    },
    // ...
}
```
