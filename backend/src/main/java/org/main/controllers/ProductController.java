package org.main.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import io.javalin.http.UploadedFile;
import org.hibernate.Session;
import org.main.HibernateUtil;
import org.main.models.Category;
import org.main.models.Product;
import org.main.models.Size;
import org.main.repositories.ProductRepository;
import io.javalin.http.Context;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ProductController {

    private final ProductRepository repo = new ProductRepository();

    public void getAll(Context context) {
        List<Product> products = repo.findAll();
        context.json(products);
    }

    public List<Product> getAllProducts() {
        List<Product> products = repo.findAll();
        return products;
    }

    public void create(Context context) throws Exception {

        ObjectMapper mapper = new ObjectMapper();

        String title = context.formParam("title");
        String description = context.formParam("description");
        Integer price = Integer.parseInt(context.formParam("price"));

        Category categoryInput = mapper.readValue(context.formParam("category"), Category.class);
        Size size = mapper.readValue(context.formParam("size"), Size.class);

        List<UploadedFile> uploadedFiles = context.uploadedFiles("image");

        String uploadDir = "uploads/";
        Files.createDirectories(Path.of(uploadDir));

        List<String> imagePaths = new ArrayList<>();

        for (UploadedFile uploadedFile : uploadedFiles) {
            String filename = UUID.randomUUID() + "_" + uploadedFile.filename();
            String imagePath = uploadDir + filename;

            try (InputStream is = uploadedFile.content()) {
                Files.copy(is, Path.of(imagePath), StandardCopyOption.REPLACE_EXISTING);
            }

            imagePaths.add(imagePath);
        }

        Category category;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            category = session.get(Category.class, categoryInput.getId());
            if (category == null) {
                context.status(400).result("Category with id " + categoryInput.getId() + " not found");
                return;
            }
        }

        Product product = new Product();
        product.setTitle(title);
        product.setDescription(description);
        product.setPrice(price);
        product.setImage(imagePaths);
        product.setCategory(category);
        product.setSize(size);

        repo.save(product);

        context.status(201);
    }


    public void delete(Context context) {
        Long id = Long.parseLong(context.pathParam("id"));
        repo.delete(id);
    }

    public void deleteAll(Context context) {
        List<Product> products = this.getAllProducts();

        for (Product product : products) {
            repo.delete(product.getId());
        }
    }

    public void getById(Context context) {
        Long id = Long.parseLong(context.pathParam("id"));
        List<Product> products = this.getAllProducts();

        for (Product product : products) {
            if (product.getId().equals(id)) {
                context.json(product);
                return;
            }
        }

        context.json(null);
    }

    public Product getByIdReturned(Long id) {

        List<Product> products = this.getAllProducts();

        Product returnProduct = null;
        for (Product product : products) {
            if (product.getId().equals(id)) {
                returnProduct = product;
                break;
            }
        }

        return returnProduct;
    }

    public void update(Context context) throws Exception {
        String id = context.pathParam("id");
        ObjectMapper mapper = new ObjectMapper();

        try {
            Long curId = Long.parseLong(id);
            Product existingProduct = this.getByIdReturned(curId);

            if (existingProduct == null) {
                context.status(404).result("Product not found");
                return;
            }

            List<UploadedFile> uploadedFiles = context.uploadedFiles("image");

            if (uploadedFiles == null || uploadedFiles.isEmpty()) {
                context.status(400).result("At least one image is required");
                return;
            }

            String uploadDir = "uploads/";
            Files.createDirectories(Path.of(uploadDir));
            List<String> imagePaths = new ArrayList<>();

            for (UploadedFile uploadedFile : uploadedFiles) {
                String filename = UUID.randomUUID() + "_" + uploadedFile.filename();
                String imagePath = uploadDir + filename;

                try (InputStream is = uploadedFile.content()) {
                    Files.copy(is, Path.of(imagePath), StandardCopyOption.REPLACE_EXISTING);
                }

                imagePaths.add(imagePath);
            }

            String title = context.formParam("title");
            String description = context.formParam("description");
            Integer price = Integer.parseInt(context.formParam("price"));
            Category categoryInput = mapper.readValue(context.formParam("category"), Category.class);
            Size size = mapper.readValue(context.formParam("size"), Size.class);

            Category category;
            try (Session session = HibernateUtil.getSessionFactory().openSession()) {
                category = session.get(Category.class, categoryInput.getId());
                if (category == null) {
                    context.status(400).result("Category with id " + categoryInput.getId() + " not found");
                    return;
                }
            }

            existingProduct.setTitle(title);
            existingProduct.setDescription(description);
            existingProduct.setPrice(price);
            existingProduct.setCategory(category);
            existingProduct.setSize(size);
            existingProduct.setImage(imagePaths);

            repo.update(existingProduct);
            context.status(200).result("Product updated successfully");

        } catch (NumberFormatException e) {
            context.status(400).result("Invalid ID format");
        }

        context.json(context.body());
    }

}

