package com.example.social.controller;


import com.example.social.domain.Message;
import com.example.social.domain.User;
import com.example.social.domain.Views;
import com.example.social.dto.MessagePageDto;
import com.example.social.dto.SecurityUser;
import com.example.social.service.MessageService;
import com.example.social.service.UserDetailsServiceImp;
import com.example.social.util.CurrentUser;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("message")
public class MessageController {
    public static final int MESSAGES_PER_PAGE = 3;

    private final UserDetailsServiceImp userDetailsService;
    private final MessageService messageService;

    @Autowired
    public MessageController(UserDetailsServiceImp userDetailsRepo, MessageService messageService) {
        this.userDetailsService = userDetailsRepo;
        this.messageService = messageService;
    }

    @GetMapping
    @JsonView(Views.FullMessage.class)
    public MessagePageDto list(
            @PageableDefault (
                    size = MESSAGES_PER_PAGE, sort = { "id" },
                    direction = Sort.Direction.DESC
            ) Pageable pageable, @CurrentUser SecurityUser currentUser
            ){
        User user = userDetailsService.findById(currentUser.getId());
        return messageService.findForUser(pageable, user);
    }

    @GetMapping("{id}")
    @JsonView(Views.FullMessage.class)
    public Message getOne(@PathVariable ("id") Message message) {
        return message;
    }

    @PostMapping
    @JsonView(Views.FullMessage.class)
    public Message create(@RequestBody Message message, @CurrentUser SecurityUser currentUser) throws IOException {
        User user = userDetailsService.findById(currentUser.getId());
        return messageService.create(message, user);
    }

    @PutMapping("{id}")
    @JsonView(Views.FullMessage.class)
    public Message update(@PathVariable ("id") Message messageFromDb, @RequestBody Message message)
            throws IOException {
        return messageService.update(messageFromDb, message);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable ("id") Message message) {
        messageService.delete (message);
    }

}
