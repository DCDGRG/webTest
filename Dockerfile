# ---- build stage ----
    FROM node:18-alpine AS build
    WORKDIR /app
    
    # 仅拷贝依赖清单利于缓存
    COPY package*.json ./
    RUN npm ci
    
    # 拷贝源码并构建（Vite: npm run build 输出 dist/；CRA 同名命令输出 build/）
    COPY . .
    RUN npm run build
    
    # ---- run stage ----
    FROM nginx:alpine
    
    # Nginx 配置：监听 8080，SPA 路由回退到 index.html
    RUN printf "server {\n\
      listen       8080;\n\
      server_name  _;\n\
      root   /usr/share/nginx/html;\n\
      index  index.html;\n\
      location / {\n\
        try_files \$uri /index.html;\n\
      }\n\
    }\n" > /etc/nginx/conf.d/default.conf
    
    # Vite：dist；如果是 CRA，请把 dist 改为 build
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 8080
    CMD ["nginx","-g","daemon off;"]