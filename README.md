# kt-oa-igsp/searchengine-web 司法领域的搜索引擎

## 开发环境
### 安装依赖
```
yarn
```
### 运行开发环境
```
yarn serve
```

## 构建
### Docker镜像
#### 安装依赖
```
yarn
```
#### 构建镜像
```
yarn build-image
```
#### 修改镜像tag
```
docker tag 192.168.93.172/kt-oa-igsp/searchengine-web:latest 192.168.93.172/kt-oa-igsp/searchengine-web:<版本号>
```
#### 将镜像启动为容器
```
docker run --name=searchengine-web --restart=always -d -p <前端Port>:80 -e LOCATION='\/SearchCase' -e PROXY_PASS='http:\/\/<接口IP>:<接口Port>' 192.168.93.172/kt-oa-igsp/searchengine-web:<版本号>
```