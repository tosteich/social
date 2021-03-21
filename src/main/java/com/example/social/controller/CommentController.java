package com.example.social.controller;

import com.example.social.domain.Comment;
import com.example.social.domain.User;
import com.example.social.domain.Views;
import com.example.social.dto.SecurityUser;
import com.example.social.service.CommentService;
import com.example.social.service.UserDetailsServiceImp;
import com.example.social.util.CurrentUser;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("comment")
public class CommentController {
    private final CommentService commentService;
    private final UserDetailsServiceImp userDetailsService;

    @Autowired
    public CommentController(CommentService commentService, UserDetailsServiceImp userDetailsService) {
        this.commentService = commentService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping
    @JsonView(Views.FullComment.class)
    public Comment create (@RequestBody Comment comment, @CurrentUser SecurityUser currentUser) {
        User user = userDetailsService.findById(currentUser.getId());
        return commentService.create(comment, user);
    }
}
