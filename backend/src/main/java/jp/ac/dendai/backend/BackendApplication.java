package jp.ac.dendai.backend;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
    @Value("${spring.datasource.url}")
    private String dataSourceUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
    CommandLineRunner checkDatabaseConnection() {
        return args -> {
            // JDBC接続のセットアップ
            try (Connection connection = DriverManager.getConnection(dataSourceUrl, dbUsername, dbPassword)) {
                System.out.println("SQLサーバとの接続が確立されました。");
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}
