package com.example.social.service;

import com.example.social.domain.User;
import com.example.social.domain.UserSubscription;
import com.example.social.repo.UserSubscriptionRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    private final UserDetailsServiceImp userDetailsService;
    private final UserSubscriptionRepo userSubscriptionRepo;

    public ProfileService(UserDetailsServiceImp userDetailsRepo, UserSubscriptionRepo userSubscriptionRepo) {
        this.userDetailsService = userDetailsRepo;
        this.userSubscriptionRepo = userSubscriptionRepo;
    }

    public User changeSubscription(User channel, User subscriber) {
        List<UserSubscription> subscribtions = channel.getSubscribers()
                .stream()
                .filter(subscription -> subscription.getSubscriber().equals(subscriber))
                .collect(Collectors.toList());
        if (subscribtions.isEmpty()) {
            UserSubscription subscription = new UserSubscription(channel, subscriber);
            channel.getSubscribers().add(subscription);
        } else {
            channel.getSubscribers().removeAll(subscribtions);
        }
        return userDetailsService.save(channel);
    }
    public List<UserSubscription> getSubscribers(User channel) {
        return userSubscriptionRepo.findByChannel(channel);
    }

    public UserSubscription getSubscriptionStatus(User channel, User subscriber) {
        UserSubscription subscription = userSubscriptionRepo.findByChannelAndSubscriber(channel, subscriber);
        subscription.setActive(!subscription.isActive());

        return userSubscriptionRepo.save(subscription);

    }
}
