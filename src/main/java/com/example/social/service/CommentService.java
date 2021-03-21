package com.example.social.service;

import com.example.social.domain.Comment;
import com.example.social.domain.User;
import com.example.social.domain.Views;
import com.example.social.dto.EventType;
import com.example.social.dto.ObjectType;
import com.example.social.repo.CommentRepo;
import com.example.social.util.WsSender;
import org.springframework.stereotype.Service;

import java.util.function.BiConsumer;

@Service
public class CommentService {
    private final CommentRepo commentRepo;
    private final BiConsumer<EventType, Comment> wsSender;

    public CommentService(CommentRepo commentRepo, WsSender wsSender) {
        this.commentRepo = commentRepo;
        this.wsSender = wsSender.getSender(ObjectType.COMMENT, Views.FullComment.class);
    }

    public Comment create (Comment comment, User user) {
        comment.setAuthor(user);
        Comment newComment = commentRepo.save(comment);

        wsSender.accept(EventType.CREATE, newComment);

        return newComment;
    }
}
