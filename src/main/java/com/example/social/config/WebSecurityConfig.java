package com.example.social.config;

import com.example.social.service.UserDetailsServiceImp;
import com.example.social.services.GoogleOAuthResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.JdbcOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;


@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    private final GoogleOAuthResolver resolver;
    private final UserDetailsServiceImp userDetailsServiceImp;


    @Autowired
    public WebSecurityConfig(GoogleOAuthResolver resolver, UserDetailsServiceImp userDetailsServiceImp) {
        this.resolver = resolver;
        this.userDetailsServiceImp = userDetailsServiceImp;
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(userDetailsServiceImp)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    public void configure (HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .antMatcher("/**").authorizeRequests()
                .antMatchers("/", "/login", "/js", "/error").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .authorizationRequestResolver(resolver)
                .and()
                .and()
                .logout().logoutSuccessUrl("/");
        http
                .rememberMe()
                .rememberMeCookieName("remember-me")
                .tokenValiditySeconds(60 * 60 * 24)
                .alwaysRemember(true);


    }

    @Bean
    public OAuth2AuthorizedClientService oAuth2AuthorizedClientService
            (JdbcOperations jdbcOperations, ClientRegistrationRepository clientRegistrationRepository) {
        return new JdbcOAuth2AuthorizedClientService(jdbcOperations, clientRegistrationRepository);
    }

}
