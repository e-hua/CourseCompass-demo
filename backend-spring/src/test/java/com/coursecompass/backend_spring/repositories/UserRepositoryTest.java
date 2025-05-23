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
    public void testSaveAndFindUser() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("JOHN@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);

        userRepository.save(john);
        Optional<User> maybeJohn = userRepository.findById(john.getId());

        assertTrue(maybeJohn.isPresent());
        assertEquals("John", maybeJohn.get().getUserName());
        userRepository.deleteById(john.getId());
    }

    @Test
    public void testFindUserById() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("J@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);

        userRepository.save(john);
        Optional<User> maybeJohn = userRepository.findById(john.getId());
        userRepository.deleteById(john.getId());
    }

    @Test
    public void testDeleteUser() {
        User john = new User();
        john.setUserName("John");
        john.setEmail("JD@doe.com");
        john.setGPA(5.0);
        john.setCurrentSemesterIndex(2);

        userRepository.save(john);
        Optional<User> maybeJohn = userRepository.findById(john.getId());

        userRepository.deleteById(john.getId());
        Optional<User> maybeEmpty = userRepository.findById(john.getId());
        assertFalse(maybeEmpty.isPresent());
        userRepository.deleteById(john.getId());
    }
}