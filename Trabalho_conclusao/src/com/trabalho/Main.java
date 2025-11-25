package com.trabalho;

import com.trabalho.controller.UsuarioController;

public class Main {
    public static void main(String[] args) {
        UsuarioController uc = new UsuarioController();

        boolean logado = uc.autenticar("teste@email.com", "1234");
        System.out.println(logado ? "Login bem-sucedido!" : "Falha no login!");
    }
}