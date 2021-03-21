package com.example.social.services;

import com.example.social.domain.User;
import com.example.social.dto.SecurityUser;
import com.example.social.repo.UserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends OidcUserService  {

    private final UserDetailsRepo userDetailsRepo;

    @Autowired
    public CustomOAuth2UserService(UserDetailsRepo userDetailsRepo) {
        this.userDetailsRepo = userDetailsRepo;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        Map attributes = oidcUser.getAttributes();
        String id = (String) attributes.get("sub");
        User user = userDetailsRepo.findById(id).orElseGet(() -> {
            User newUser = new User();
            newUser.setId(id);
            newUser.setName((String) attributes.get("name"));
            newUser.setEmail((String) attributes.get("email"));
            newUser.setGender((String) attributes.get("gender"));
            newUser.setLocale((String) attributes.get("locale"));
            newUser.setUserpic((String) attributes.get("picture"));
            newUser.setPassword("password");
            return newUser;
        });
        user.setLastVisit(LocalDateTime.now());
        return new SecurityUser(userDetailsRepo.save(user));
    }

}
