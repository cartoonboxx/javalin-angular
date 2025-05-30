package org.main.repositories;

import org.main.models.Category;
import org.main.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.main.models.Product;

import java.util.List;

public class CategoryRepository {

    public List<Category> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            return session.createQuery("FROM Category", Category.class).list();
        }
    }

    public void save(Category category) {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            session.persist(category);
            tx.commit();
        } catch (Exception ex) {
            if (tx != null) tx.rollback();
            throw ex;
        }
    }

    public void delete(Long id) {
        System.out.println(id);
        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();
            Category category = session.get(Category.class, id);
            if (category != null) {
                session.remove(category);
            }
            tx.commit();
        } catch (Exception ex) {
            if (tx != null) tx.rollback();
            throw ex;
        }
    }

    public Category getByName(String name) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            List<Category> categories = session.createQuery("FROM Category", Category.class).list();

            for (Category category : categories) {
                if (category.getLink().equals(name)) {
                    return category;
                }
            }

            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void update(Category category) {
        if (category.getId() == null) {
            throw new IllegalArgumentException("Category ID cannot be null");
        }

        Transaction tx = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            tx = session.beginTransaction();

            Category existingCategory = session.get(Category.class, category.getId());
            if (existingCategory == null) {
                throw new IllegalArgumentException("Category with ID " + category.getId() + " does not exist");
            }

            session.merge(category);
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

