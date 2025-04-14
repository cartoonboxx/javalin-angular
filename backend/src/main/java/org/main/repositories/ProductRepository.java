package org.main.repositories;

import org.hibernate.Hibernate;
import org.main.models.Product;
import org.main.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class ProductRepository {

    public List<Product> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            List<Product> products = session.createQuery("FROM Product", Product.class).list();
            for (Product product : products) {
                Hibernate.initialize(product.getImage());
                Hibernate.initialize(product.getCategory());
                Hibernate.initialize(product.getSize());
            }
            return products;
        }
    }

    public void save(Product product) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Hibernate.initialize(product.getImage());
            tx = session.beginTransaction();
            session.persist(product);
            tx.commit();
        } catch (Exception ex) {
            if (tx != null && tx.getStatus().canRollback()) {
                try {
                    tx.rollback();
                } catch (Exception rollbackEx) {
                    System.err.println("Rollback failed: " + rollbackEx.getMessage());
                }
            }
            throw ex;
        }
    }


    public void delete(Long id) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Product product = session.get(Product.class, id);
            Hibernate.initialize(product.getImage());
            if (product != null) {
                session.remove(product);
            }
            tx.commit();
        } catch (Exception ex) {
            if (tx != null) tx.rollback();
            throw ex;
        }
    }

    public void update(Product product) {
        if (product.getId() == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }

        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();

            // Проверяем, существует ли объект с таким id
            Hibernate.initialize(product.getImage());
            Product existingProduct = session.get(Product.class, product.getId());
            Hibernate.initialize(existingProduct.getImage());
            if (existingProduct == null) {
                throw new IllegalArgumentException("Product with ID " + product.getId() + " does not exist");
            }

            // Обновляем объект
            session.merge(product);
            tx.commit();
        } catch (Exception ex) {
            if (tx != null && tx.getStatus().canRollback()) {
                try {
                    tx.rollback();
                } catch (Exception rollbackEx) {
                    System.err.println("Rollback failed: " + rollbackEx.getMessage());
                }
            }
        }
    }

}

