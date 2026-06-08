"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Group 2 Truck Loading API.")
        .setDescription("Truck loading optimisation backend and inventory management API")
        .setVersion("1.0")
        .addTag('trucks')
        .addTag('items')
        .addTag('optimisation')
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
    }, "bearerAuth")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const express = app.getHttpAdapter().getInstance();
    express.get('/swagger.json', (_req, res) => res.json(document));
    express.get('/swagger-extra.js', (_req, res) => {
        res
            .type('application/javascript')
            .send(`
        (function () {
          // wait for UI to mount
          const onReady = () => {
            const topbar = document.querySelector('.swagger-ui .topbar');
            if (!topbar) return;
            const link = document.createElement('a');
            link.href = '/docs-json';
            link.textContent = 'OpenAPI JSON';
            link.target = '_blank';
            link.style.marginLeft = '12px';
            link.style.fontWeight = '600';
            link.style.textDecoration = 'none';
            topbar.appendChild(link);
          };
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onReady);
          } else {
            onReady();
          }
        })();
      `);
    });
    swagger_1.SwaggerModule.setup('/swagger', app, document, {
        customSiteTitle: 'Group 2 Truck Loading API Swagger',
        customJs: '/swagger-extra.js',
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map