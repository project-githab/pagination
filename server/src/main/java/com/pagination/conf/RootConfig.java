package com.pagination.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableScheduling
public class RootConfig implements WebMvcConfigurer {

    private static final String ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";



    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowCredentials(true);

        corsConfiguration.setMaxAge(3600L);

//        corsConfiguration.setAllowedOrigins(Collections.singletonList(originHost))
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200"));


        corsConfiguration.setAllowedHeaders(Arrays.asList(
                "Origin",
                ACCESS_CONTROL_ALLOW_ORIGIN,
                "Content-Type",
                "Accept",
                "Token",
                "Authorization",
                "X-Requested-With",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"));

        corsConfiguration.setExposedHeaders(Arrays.asList(
                "Origin",
                ACCESS_CONTROL_ALLOW_ORIGIN,
                "Content-Type",
                "Accept",
                "Token",
                "Authorization",
                "Access-Control-Allow-Credentials"));

        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE"));

        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(urlBasedCorsConfigurationSource);
    }


}
