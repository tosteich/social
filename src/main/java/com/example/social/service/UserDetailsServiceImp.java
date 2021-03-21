package com.example.social.service;

import com.example.social.domain.User;
import com.example.social.dto.SecurityUser;
import com.example.social.repo.UserDetailsRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserDetailsServiceImp implements UserDetailsService {
    private final UserDetailsRepo userDetailsRepo;

    public UserDetailsServiceImp(UserDetailsRepo userDetailsRepo) {
        this.userDetailsRepo = userDetailsRepo;
    }

    public User findByOAuth2Token (OAuth2AuthenticationToken authToken) {
        if (authToken != null) {
            return userDetailsRepo.findById(authToken.getName()).orElse(null);
        }
        return null;
    }

    public User findByEmail (String email) {
        return userDetailsRepo.findByEmail(email).get();
    }

    public User save (User user) {
        return userDetailsRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userDetailsRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
                );

        return new SecurityUser(user);
    }

    public User findById(String id) {
        return userDetailsRepo.findById(id).orElse(null);
    }
}
