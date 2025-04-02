package org.main;

import io.javalin.http.Context;

import java.util.Arrays;

public final class Data {
    private Data() {}

    static String[] avaliableCakes = {"carrot cake", "chocolate cake", "cheesecake"};

    public static void getAllCakes(Context context) {
        context.json(avaliableCakes);
    }

    public static void getCake(Context context) {
        System.out.println(context.pathParam("special"));
        for (String cake: avaliableCakes) {

            if (cake.contains(context.pathParam("special"))) {
                context.result(cake);
                return;
            }
        }

        context.result("No cake found");
    }
}
