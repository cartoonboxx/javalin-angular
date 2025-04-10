package org.main.repositories;

import org.main.models.Product;
import org.main.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class ProductRepository {

    public List<Product> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Product", Product.class).list();
        }
    }

    public void save(Product product) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.persist(product);
            tx.commit();
        } catch (Exception ex) {
            if (tx != null && tx.getStatus().canRollback()) {
                try {
                    tx.rollback();
                } catch (Exception rollbackEx) {
                    System.err.println("⚠️ Rollback failed: " + rollbackEx.getMessage());
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
            if (product != null) {
                session.remove(product);
            }
            tx.commit();
        } catch (Exception ex) {
            if (tx != null) tx.rollback();
            throw ex;
        }
    }

    public void getById(Long id) {
//        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
//            List<Product> products = session.createQuery("FROM Product", Product.class).list();
//            Product gotProduct = products.get(0);
//            products.forEach(product -> {
//                if (product.getId().equals(id)) {
//                    gotProduct = product;
//                }
//            });
//
//            return gotProduct;
//
//        }
//
//
    }
}

