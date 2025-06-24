package com.coursecompass.backend_spring;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import com.coursecompass.backend_spring.dto.CoursePreviewDTO;
import com.coursecompass.backend_spring.dto.PageDTO;
import com.coursecompass.backend_spring.dto.comments.CommentReadDTO;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentIntegrationTest {
  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private ObjectMapper objectMapper;


  @Test
  void testGettingCourseComment() throws Exception {
    MvcResult result = mockMvc.perform(get("/api/comments/ABM5001"))
            .andExpect(status().isOk())
            .andReturn();

    String json = result.getResponse().getContentAsString();

    List<CommentReadDTO> comments = objectMapper.readValue(
            json,
            objectMapper.getTypeFactory().constructCollectionType(List.class, CommentReadDTO.class)
    );

    assertEquals(1, comments.size());
    CommentReadDTO comment = comments.get(0);
    assertEquals("dummy@example.com", comment.getAuthorEmail());
    assertEquals("This is a dummy message", comment.getContent());
    assertEquals("ABM5001", comment.getCourseCode());
  }
}
