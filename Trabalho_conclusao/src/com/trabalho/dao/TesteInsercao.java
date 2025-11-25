package com.trabalho.dao;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class TesteInsercao {
    public static void main(String[] args) {
        Connection conexao = Conexao.conectar();

        if (conexao != null) {
            String sql = "INSERT INTO usuarios (nome, email, senha_hash, ativo) VALUES (?, ?, ?, ?)";

            try (PreparedStatement stmt = conexao.prepareStatement(sql)) {
                stmt.setString(1, "Usuário Teste Java");
                stmt.setString(2, "teste_java@example.com");
                stmt.setString(3, "123456"); 
                stmt.setBoolean(4, true);

                int linhas = stmt.executeUpdate();

                if (linhas > 0) {
                    System.out.println("✅ Usuário inserido com sucesso!");
                } else {
                    System.out.println("⚠️ Nenhum dado inserido.");
                }
            } catch (SQLException e) {
                System.err.println("❌ Erro ao inserir: " + e.getMessage());
            }
        }
    }
}