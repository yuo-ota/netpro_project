package jp.ac.dendai.backend.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        registry.addViewController("/{path:[^\\.]*}")
        .setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:[^\\.]+}")
                .setViewName("forward:/index.html");
    }
}