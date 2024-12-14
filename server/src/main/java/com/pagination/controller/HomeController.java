package com.pagination.controller;

import com.pagination.model.Users;
import com.pagination.repo.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    // Репозиторий базы данных.
    final private 
    UserRepository userRepository;

    public HomeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Главная страница Hello World
    @GetMapping(value = "/")
    public String home() {
        return "Hello World";
    }


    // Страница, которая возвращает пост первой страницы
    @GetMapping(value = "/posts", produces = "application/json")
    public Page<Users> users() {

        Pageable pageable = PageRequest.of(0, 3, Sort.Direction.DESC, "id");

        Page<Users> ads = userRepository.findAll(pageable);

        return ads;
    }


    // Страница с ID, которая возвращает посты по ID
    @GetMapping(value = "/posts/{pageId}", produces = "application/json")
    public Page<Users> users(@PathVariable(value = "pageId") int pageId) {

            Pageable pageable = PageRequest.of(pageId - 1, 3, Sort.Direction.DESC, "id");

            Page<Users> ads = userRepository.findAll(pageable);


            return ads;
        }




}
