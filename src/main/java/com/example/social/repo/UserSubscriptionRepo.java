package com.example.social.repo;

import com.example.social.domain.User;
import com.example.social.domain.UserSubscription;
import com.example.social.domain.UserSubscriptionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSubscriptionRepo extends JpaRepository <UserSubscription, UserSubscriptionId> {
    List<UserSubscription> findBySubscriber (User user);

    List<UserSubscription> findByChannel(User channel);

    UserSubscription findByChannelAndSubscriber(User channel, User subscriber);
}
