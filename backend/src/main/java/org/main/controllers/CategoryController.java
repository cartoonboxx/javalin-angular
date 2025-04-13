package org.main.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.UploadedFile;
import org.main.models.Category;
import org.main.models.Product;
import org.main.models.Size;
import org.main.repositories.CategoryRepository;
import io.javalin.http.Context;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

public class CategoryController {

    private final CategoryRepository repo = new CategoryRepository();

    public void getAll(Context context) {
        List<Category> categories = repo.findAll();
        context.json(categories);
    }

    public List<Category> getAllCategories() {
        List<Category> categories = repo.findAll();
        return categories;
    }

    public void create(Context context) throws Exception {
        // 1. Получаем текстовые поля
        String title = context.formParam("title");
        String link = context.formParam("link");

        // 2. Обработка файла
        UploadedFile uploadedFile = context.uploadedFile("image");
        if (uploadedFile == null) {
            context.status(400).result("Image is required");
            return;
        }

        // 3. Сохраняем файл
        String uploadDir = "uploads/categories/";
        Files.createDirectories(Path.of(uploadDir));
        String imagePath = uploadDir + uploadedFile.filename();

        try (InputStream is = uploadedFile.content()) {
            Files.copy(is, Path.of(imagePath), StandardCopyOption.REPLACE_EXISTING);
        }

        // 4. Создаём Category
        Category category = new Category();
        category.setTitle(title);
        category.setLink(link);
        category.setImage(imagePath); // путь к сохранённому изображению

        repo.save(category);
        context.status(201);
    }

    public void delete(Context context) {
        Long id = Long.parseLong(context.pathParam("id"));
        System.out.println(id);
        repo.delete(id);
    }

    public void getByName(Context context) {
        String title = context.pathParam("name");
        System.out.println("title " + title);
        Category currentCat = repo.getByName(title);
        context.json(currentCat);
    }

    public Category getByIdReturned(Long id) {

        List<Category> categories = this.getAllCategories();

        Category returnCategory = null;
        for (Category category : categories) {
            if (category.getId().equals(id)) {
                returnCategory = category;
                break;
            }
        }

        return returnCategory;

    }

    public void update(Context context) throws Exception {
        String id = context.pathParam("id");
        ObjectMapper mapper = new ObjectMapper();

        try {
            Long curId = Long.parseLong(id); // Преобразуем строку в число
            Category category = this.getByIdReturned(Long.parseLong(id)); // Получаем продукт по id

            if (category == null) {
                context.status(404).result("Category not found");
                return;
            }

            UploadedFile uploadedFile;

            System.out.println("image " + context.formParam("image"));
            if (context.uploadedFile("image") != null) {
                uploadedFile = context.uploadedFile("image");
            }
            else {
                System.out.println("now there");
                uploadedFile = null;
            }


            String imagePath;

            if (uploadedFile != null) {
                String uploadDir = "uploads/categories/";
                Files.createDirectories(Path.of(uploadDir));
                imagePath = uploadDir + uploadedFile.filename();
                try (InputStream is = uploadedFile.content()) {
                    Files.copy(is, Path.of(imagePath), StandardCopyOption.REPLACE_EXISTING);
                }
            }
            else {
                imagePath = category.getImage();
            }

            String title = context.formParam("title");
            String link = context.formParam("link");
            Category categoryResponse = new Category(title, link, imagePath);
            categoryResponse.setId(curId);

            repo.update(categoryResponse);
            context.status(200).result("Category updated successfully");
        } catch (NumberFormatException e) {
            context.status(400).result("Invalid ID format");
        }

        context.json(context.body());

    }
}

