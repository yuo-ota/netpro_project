package jp.ac.dendai.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    
    @RequestMapping("/demo")
    public String test() {
        System.out.println("Enter demo");
        return "Hello World";
    }
}