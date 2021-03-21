package com.example.social;

import io.sentry.Sentry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocialApplication {

	public static void main(String[] args) {
		Sentry.captureMessage("Application started");
		SpringApplication.run(SocialApplication.class, args);
	}

}
