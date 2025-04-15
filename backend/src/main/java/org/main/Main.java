package org.main;

import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.staticfiles.Location;
import org.main.controllers.CategoryController;
import org.main.controllers.ProductController;
import org.main.controllers.TelegramController;

public class Main {
    public static void main(String[] args) {
        ProductController productController = new ProductController();
        CategoryController categoryController = new CategoryController();
        TelegramController telegramController = new TelegramController();

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(corsConfig -> {
                    corsConfig.allowHost("http://localhost:4200");
                });
            });
            config.staticFiles.add(staticFileConfig -> {
                staticFileConfig.hostedPath = "/uploads";
                staticFileConfig.directory = "uploads";
                staticFileConfig.location = Location.EXTERNAL;
            });
        }).start(7070);

        app.get("/products", productController::getAll);
        app.get("/products/{id}", productController::getById);
        app.delete("/products/{id}", productController::delete);
        app.delete("/products", productController::deleteAll);
        app.post("/products", productController::create);
        app.post("/products/{id}", productController::update);

        app.get("/categories", categoryController::getAll);
        app.post("/categories", categoryController::create);
        app.delete("/categories/{id}", categoryController::delete);
        app.get("/categories/{name}", categoryController::getByName);
        app.post("/categories/{id}", categoryController::update);

        app.post("sendtg", telegramController::sendDataTelegram);

    }
}
