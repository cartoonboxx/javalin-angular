package org.main;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {
        Javalin app = Javalin.create().start(7070);
        app.get("/cakes/", Data::getAllCakes);
        app.get("/cakes/{special}", Data::getCake);
    }
}
