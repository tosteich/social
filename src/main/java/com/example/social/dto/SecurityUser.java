package com.example.social.dto;

import com.example.social.domain.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collections;
import java.util.Map;

public class SecurityUser extends org.springframework.security.core.userdetails.User implements OidcUser {

    private static final long serialVersionUID = 1L;


    private User user;
    private String email;
    private String id;

    public SecurityUser(User user) {
        super(user.getEmail(), user.getPassword(), true,
                true, true, true, Collections.
                        singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        this.email = user.getEmail();
        this.id = user.getId();
    }

    public String getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public String getName() {
        return this.id;
    }

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }
}