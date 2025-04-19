package org.main.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import org.main.models.Category;
import org.main.models.Product;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class TelegramController {

    public void sendDataTelegram(Context context) {
        
        String message = context.formParam("message");
        String token = "7889645915:AAHSvhityM0wgTE-yd3cbbB2Eo7QTVd_9KY";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.telegram.org/bot" + token + "/sendMessage" +
                        "?chat_id=794764771&text=" + message))
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            context.result("Ваши данные были отправлены, ожидайте ответа");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            context.status(500).result("Ошибка при запросе к внешнему API");
        }
    }
}
