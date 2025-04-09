package org.main;

import io.javalin.http.Context;

public class Data {
    public static void getCake(Context ctx) {
        String name = ctx.pathParam("special");
        ctx.result("Торт: " + name);
    }
}
