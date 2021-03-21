package com.example.social.controller;


import com.example.social.domain.User;
import com.example.social.domain.Views;
import com.example.social.dto.MessagePageDto;
import com.example.social.dto.SecurityUser;
import com.example.social.service.MessageService;
import com.example.social.service.UserDetailsServiceImp;
import com.example.social.util.CurrentUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;

@Controller
public class MainController {

    private final UserDetailsServiceImp userDetailsService;
    private final MessageService messageService;
    private final ObjectWriter messageWriter;
    private final ObjectWriter profileWriter;


    @Autowired
    public MainController(UserDetailsServiceImp userDetailsService, MessageService messageService, ObjectMapper mapper) {
        this.userDetailsService = userDetailsService;
        this.messageService = messageService;
        ObjectMapper objectMapper = mapper
                .setConfig(mapper.getDeserializationConfig());
        this.messageWriter = objectMapper
                .writerWithView(Views.FullMessage.class);
        this.profileWriter = objectMapper
                .writerWithView(Views.FullProfile.class);
    }

    @GetMapping("/")
    public String getMainIndex (Model model, @CurrentUser SecurityUser currentUser) throws JsonProcessingException {
        HashMap<Object, Object> data = new HashMap<>();
        model.addAttribute("messages", "[]");
        String serializedProfile = "null";
        if (currentUser != null) {
            User user = userDetailsService.findById(currentUser.getId());
            serializedProfile = profileWriter.writeValueAsString(user);
            Sort sort = Sort.by(Sort.Direction.DESC, "id");
            Pageable pageable = PageRequest.of (0, MessageController.MESSAGES_PER_PAGE, sort );
            MessagePageDto messagePageDto = messageService.findForUser(pageable, user);
            String messages = messageWriter.writeValueAsString(messagePageDto.getMessages());
            model.addAttribute("messages", messages);
            data.put("currentPage", messagePageDto.getCurrentPage());
            data.put("totalPages", messagePageDto.getTotalPages());
        }
        model.addAttribute("profile", serializedProfile);
        model.addAttribute("frontendData", data);
        return "index";
    }

}
