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
        Category category = context.bodyAsClass(Category.class);
        repo.delete(category.getId());
    }
}

