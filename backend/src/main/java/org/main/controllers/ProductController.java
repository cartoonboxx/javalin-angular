package org.main.controllers;

import org.main.models.Product;
import org.main.repositories.ProductRepository;
import io.javalin.http.Context;

import java.util.List;

public class ProductController {

    private final ProductRepository repo = new ProductRepository();

    public void getAll(Context context) {
        List<Product> products = repo.findAll();
        context.json(products);
    }

    public void create(Context context) {
        Product product = context.bodyAsClass(Product.class);
        repo.save(product);
        context.status(201);
    }

    public void delete(Context context) {
        Product product = context.bodyAsClass(Product.class);
        repo.delete(product.getId());
    }
}

