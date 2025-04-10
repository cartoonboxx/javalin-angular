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
import java.util.List;

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

        UploadedFile uploadedFile = context.uploadedFile("image");
        if (uploadedFile == null) {
            context.status(400).result("Image is required");
            return;
        }

        String uploadDir = "uploads/";
        Files.createDirectories(Path.of(uploadDir));
        String imagePath = uploadDir + uploadedFile.filename();

        try (InputStream is = uploadedFile.content()) {
            Files.copy(is, Path.of(imagePath), StandardCopyOption.REPLACE_EXISTING);
        }

        // 🔥 Главное изменение: загружаем Category из БД
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
        product.setImage(imagePath);
        product.setCategory(category); // ✅ "attached" Category
        product.setSize(size);

        System.out.println(product.getCategory().getId() + " " + product.getSize().getHeight());

        repo.save(product); // теперь Hibernate не упадёт

        context.status(201);
    }

    public void delete(Context context) {
        Long id = Long.parseLong(context.pathParam("id"));
        repo.delete(id);
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

    public void update(Context context) {
        Long id = Long.parseLong(context.pathParam("id"));

        

    }
}

