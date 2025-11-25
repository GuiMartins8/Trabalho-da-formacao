package com.trabalho.dao;

import com.trabalho.model.Usuario;
import java.sql.*;

public class UsuarioDAO {
	public boolean login(String email, String senha) {
		String sql = "SELECT * FROM usuarios WHERE email = ? AND senha_hash = ?";
		try (Connection con = Conexao.conectar(); PreparedStatement stmt = con.prepareStatement(sql)) {

			stmt.setString(1, email);
			stmt.setString(2, senha);
			ResultSet rs = stmt.executeQuery();

			return rs.next();
		} catch (Exception e) {
			System.out.println("Erro no login: " + e.getMessage());
			return false;
		}
	}
}