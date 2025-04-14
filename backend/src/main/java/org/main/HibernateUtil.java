package org.main;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.main.models.Product;
import org.main.models.Size;
import org.main.models.Category;

public class HibernateUtil {
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            Configuration config = new Configuration();
            config.configure();
            config.addAnnotatedClass(Product.class);
            config.addAnnotatedClass(Size.class);
            config.addAnnotatedClass(Category.class);

            config.setProperty("hibernate.connection.driver_class", "org.postgresql.Driver");
            config.setProperty("hibernate.connection.url", "jdbc:postgresql://localhost:5432/shopdb");
            config.setProperty("hibernate.connection.username", "shopuser");
            config.setProperty("hibernate.connection.password", "secret");
            config.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
            config.setProperty("hibernate.hbm2ddl.auto", "update");
            config.setProperty("hibernate.show_sql", "true");
            config.setProperty("hibernate.connection.provider_class", "org.hibernate.hikaricp.internal.HikariCPConnectionProvider");

            return config.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError("SessionFactory creation failed: " + ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
