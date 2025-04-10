package org.main;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import org.main.controllers.CategoryController;
import org.main.controllers.ProductController;

public class Main {
    public static void main(String[] args) {
        ProductController productController = new ProductController();
        CategoryController categoryController = new CategoryController();

        Javalin app = Javalin.create(config -> {
            // Разрешаем CORS для конкретных доменов
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(corsConfig -> {
                    corsConfig.allowHost("http://localhost:4200");
                });
            });
            config.staticFiles.add(staticFileConfig -> {
                staticFileConfig.hostedPath = "/uploads";
                staticFileConfig.directory = "uploads"; // локальная папка на диске
                staticFileConfig.location = Location.EXTERNAL; // ВАЖНО
            });
        }).start(7070);

        app.get("/test", ctx -> {ctx.result("test");});

        app.get("/products", productController::getAll);
        app.post("/products", productController::create);
        app.delete("/products/{id}", productController::delete);
        app.get("/products/{id}", productController::getById);

        app.get("/categories", categoryController::getAll);
        app.post("/categories", categoryController::create);
        app.delete("/categories/{id}", categoryController::delete);
        app.get("/categories/{name}", categoryController::getByName);

    }
}
