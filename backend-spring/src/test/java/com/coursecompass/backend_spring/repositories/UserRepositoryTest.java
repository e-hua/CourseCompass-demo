package com.coursecompass.backend_spring.repositories;

import com.coursecompass.backend_spring.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;


    @Test
    void testSaveAndFindUser() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("john@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);

        userRepository.save(john);
        Optional<User> maybeJohn = userRepository.findById(john.getId());

        assertTrue(maybeJohn.isPresent());
        assertEquals("John", maybeJohn.get().getUserName());
        assertEquals("John", maybeJohn.get().getUserName());
    }

    @Test
    void testFindUserById() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("john@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);

        userRepository.save(john);
        Optional<User> maybeJohn = userRepository.findById(john.getId());
        assertEquals(1, maybeJohn.get().getId());
    }

    @Test
    void testDeleteUser() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("john@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);

        userRepository.save(john);
        Optional<User> maybeJohn = userRepository.findById(john.getId());

        userRepository.deleteById(john.getId());
        Optional<User> maybeEmpty = userRepository.findById(john.getId());
        assertFalse(maybeEmpty.isPresent());
    }
}