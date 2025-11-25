package com.trabalho.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {
	private static final String URL = "jdbc:postgresql://localhost:5432/Login_trabalho_curso";
	private static final String USER = "postgres";
	private static final String PASS = "25042008GUIL";

	public static Connection conectar() {
		try {
			Connection conn = DriverManager.getConnection(URL, USER, PASS);
			System.out.println("✅ Conectado ao PostgreSQL!");
			return conn;
		} catch (Exception e) {
			System.out.println("❌ Erro de conexão: " + e.getMessage());
			return null;
		}
	}
}
