package com.example.social.controller;

import com.example.social.domain.User;
import com.example.social.domain.UserSubscription;
import com.example.social.domain.Views;
import com.example.social.dto.SecurityUser;
import com.example.social.service.ProfileService;
import com.example.social.service.UserDetailsServiceImp;
import com.example.social.util.CurrentUser;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("profile")
public class ProfileController {
    private final ProfileService profileService;
    private final UserDetailsServiceImp userDetailsService;


    public ProfileController(ProfileService profileService, UserDetailsServiceImp userDetailsService) {
        this.profileService = profileService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping ("{id}")
    @JsonView(Views.FullProfile.class)
    public User get (@PathVariable ("id") User user) {
        return user;
    }

    @PostMapping ("change-subscription/{channelId}")
    @JsonView(Views.FullProfile.class)
    public User changeSubscription (
            @PathVariable ("channelId") User channel,
            @CurrentUser SecurityUser currentUser
    ) {
        User subscriber = userDetailsService.findById(currentUser.getId());
        if (subscriber.equals(channel)) {
            return channel;
        } else {
            return profileService.changeSubscription(channel, subscriber);
        }
    }

    @GetMapping ("get-subscribers/{channelId}")
    @JsonView({Views.IdName.class})
    public List<UserSubscription> subscribers (@PathVariable ("channelId") User channel) {
        return profileService.getSubscribers(channel);
    }

    @PostMapping ("change-status/{subscriberId}")
    @JsonView({Views.IdName.class})
    public UserSubscription changeSubscriptionStatus (
            @PathVariable ("subscriberId") User subscriber,
            @CurrentUser SecurityUser currentUser
    ) {
        User channel = userDetailsService.findById(currentUser.getId());
        return profileService.getSubscriptionStatus(channel, subscriber);
    }
}
