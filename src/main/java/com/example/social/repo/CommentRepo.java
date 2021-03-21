package com.example.social.repo;

import com.example.social.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository <Comment, Long> {
}
