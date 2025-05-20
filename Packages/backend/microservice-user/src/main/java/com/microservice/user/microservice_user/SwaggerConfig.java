package com.microservice.user.microservice_user;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI userServiceAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8090");
        devServer.setDescription("User Service - Development");

        Info info = new Info()
                .title("User Service API")
                .version("1.0")
                .description("API para gestión de usuarios en eventos");

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer));
    }

}

