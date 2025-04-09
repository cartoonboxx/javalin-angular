package org.main.controllers;

import org.main.models.Category;
import org.main.repositories.CategoryRepository;
import io.javalin.http.Context;

import java.util.List;

public class CategoryController {

    private final CategoryRepository repo = new CategoryRepository();

    public void getAll(Context context) {
        List<Category> categories = repo.findAll();
        context.json(categories);
    }

    public void create(Context context) {
        Category category = context.bodyAsClass(Category.class);
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
        System.out.println("title" + title);
        Category currentCat = repo.getByName(title);
        context.json(currentCat);
    }
}

