package org.main.models;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String image;
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "category_id") // внешний ключ к Category
    private Category category;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "size_id") // внешний ключ к Category
    private Size size;


    public Product() {}

    public Product(String title, String description, String image, Integer price, Category category, Size size) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.category = category;
        this.size = size;

    }

    // геттеры и сеттеры

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }
}
