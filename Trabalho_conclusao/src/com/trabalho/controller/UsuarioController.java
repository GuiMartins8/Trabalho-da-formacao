package com.trabalho.controller;

import com.trabalho.dao.UsuarioDAO;

public class UsuarioController {
	private UsuarioDAO dao = new UsuarioDAO();

	public boolean autenticar(String email, String senha) {
		if (email.isEmpty() || senha.isEmpty()) {
			System.out.println("Campos vazios!");
			return false;
		}
		return dao.login(email, senha);
	}
}